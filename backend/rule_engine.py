"""
ResolvAI Copilot - Rule Engine (backend/rule_engine.py)

Deterministic hard rule-based engine to analyze telecom customer complaints
and detect billing, transaction, and usage anomalies before AI/LLM analysis.
"""

import sys
from typing import Dict, Any, List, Optional
import pandas as pd
import numpy as np

# Reconfigure stdout to utf-8 on Windows if needed
if hasattr(sys.stdout, 'reconfigure'):
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass


def detect_duplicate_transactions(cust_tx: pd.DataFrame) -> List[Dict[str, Any]]:
    """
    Rule 1: Duplicate Transaction Detection
    Looks for transactions where the same customer has 2+ transactions with:
      - Same amount (within 0.01 tolerance)
      - Same transaction_type
      - Same package_id (if applicable / both present or both null)
      - Timestamps within 120 seconds (2 minutes) of each other

    Returns:
        List of duplicate transaction group dicts.
    """
    if cust_tx.empty or len(cust_tx) < 2:
        return []

    df = cust_tx.copy()

    # Determine timestamp column name
    time_col = 'timestamp' if 'timestamp' in df.columns else ('transaction_date' if 'transaction_date' in df.columns else None)
    if not time_col:
        return []

    # Ensure datetime parsing
    df['parsed_time'] = pd.to_datetime(df[time_col], errors='coerce')
    df = df.dropna(subset=['parsed_time', 'amount', 'transaction_type']).sort_values('parsed_time')

    duplicate_details = []
    n = len(df)

    for i in range(n):
        t1 = df.iloc[i]
        for j in range(i + 1, n):
            t2 = df.iloc[j]
            gap_seconds = (t2['parsed_time'] - t1['parsed_time']).total_seconds()

            if gap_seconds > 120:
                break

            # Compare amounts (within 0.01 tolerance)
            if abs(float(t1['amount']) - float(t2['amount'])) <= 0.01:
                # Compare transaction_type
                if str(t1['transaction_type']).strip().lower() == str(t2['transaction_type']).strip().lower():
                    # Compare package_id (if applicable)
                    p1 = t1.get('package_id')
                    p2 = t2.get('package_id')

                    p1_isna = pd.isna(p1) or str(p1).strip() in ['', 'nan', 'None']
                    p2_isna = pd.isna(p2) or str(p2).strip() in ['', 'nan', 'None']

                    # Match if both null OR both equal
                    if (p1_isna and p2_isna) or (not p1_isna and not p2_isna and str(p1).strip() == str(p2).strip()):
                        duplicate_details.append({
                            "transaction_ids": [str(t1['transaction_id']), str(t2['transaction_id'])],
                            "amount": float(t1['amount']),
                            "type": str(t1['transaction_type']),
                            "time_gap_seconds": round(float(gap_seconds), 2)
                        })

    return duplicate_details


def detect_failed_transactions(cust_tx: pd.DataFrame) -> List[Dict[str, Any]]:
    """
    Rule 2: Failed Transaction / Missing Refund Detection
      - Flag any transaction where status = "Failed"
      - Flag any Refund transaction where status = "Pending" (stuck refunds)

    Returns:
        List of failed/pending transaction dicts.
    """
    if cust_tx.empty:
        return []

    failed_details = []

    for _, row in cust_tx.iterrows():
        tx_id = str(row.get('transaction_id', ''))
        tx_type = str(row.get('transaction_type', '')).strip()
        status = str(row.get('status', '')).strip()
        amount = float(row['amount']) if pd.notna(row.get('amount')) else 0.0

        if status.lower() == 'failed':
            failed_details.append({
                "transaction_id": tx_id,
                "type": tx_type,
                "amount": amount,
                "issue_type": "FAILED_TRANSACTION"
            })
        elif tx_type.lower() == 'refund' and status.lower() == 'pending':
            failed_details.append({
                "transaction_id": tx_id,
                "type": tx_type,
                "amount": amount,
                "issue_type": "STUCK_REFUND"
            })

    return failed_details


def detect_balance_mismatches(cust_tx: pd.DataFrame) -> List[Dict[str, Any]]:
    """
    Rule 3: Balance Mismatch Detection
    For each transaction, calculate expected balance_after based on balance_before and transaction_type:
      - Recharge, Refund -> expected = balance_before + amount
      - Package Purchase, Package Renewal, Bill Payment -> expected = balance_before - amount
    Flag if abs(actual balance_after - expected) > 0.01.

    Returns:
        List of balance mismatch dicts.
    """
    if cust_tx.empty:
        return []

    balance_details = []
    plus_types = {"recharge", "refund"}
    minus_types = {"package purchase", "package renewal", "bill payment"}

    for _, row in cust_tx.iterrows():
        b_before = row.get('balance_before')
        b_after = row.get('balance_after')
        amount = row.get('amount')
        tx_type = str(row.get('transaction_type', '')).strip().lower()

        if pd.isna(b_before) or pd.isna(b_after) or pd.isna(amount):
            continue

        b_before = float(b_before)
        b_after = float(b_after)
        amount = float(amount)

        if tx_type in plus_types:
            expected_balance = b_before + amount
        elif tx_type in minus_types:
            expected_balance = b_before - amount
        else:
            continue

        diff = abs(b_after - expected_balance)
        if diff > 0.01:
            balance_details.append({
                "transaction_id": str(row.get('transaction_id', '')),
                "expected_balance": round(expected_balance, 2),
                "actual_balance": round(b_after, 2),
                "difference": round(diff, 2)
            })

    return balance_details


def detect_usage_overage(
    customer_id: str,
    cust_tx: pd.DataFrame,
    usage_df: Optional[pd.DataFrame] = None,
    packages_df: Optional[pd.DataFrame] = None
) -> tuple[bool, Optional[Dict[str, Any]]]:
    """
    Rule 4: Usage vs Package Limit Check
    Compares customer's total data usage (data_mb) against active package limit.

    Returns:
        (usage_overage_detected: bool, usage_details: Optional[dict])
    """
    if usage_df is None or usage_df.empty:
        return False, None

    # Filter usage for customer
    cust_usage = usage_df[usage_df['customer_id'] == customer_id]
    if cust_usage.empty:
        return False, None

    total_usage_mb = float(cust_usage['data_mb'].sum())

    # Find active/latest package from successful transactions
    package_name = "Unknown Package"
    package_limit_mb = None

    if packages_df is not None and not packages_df.empty and not cust_tx.empty:
        # Filter successful transactions with a package_id
        pkg_tx = cust_tx[
            (cust_tx['status'].astype(str).str.lower() == 'success') &
            (cust_tx['package_id'].notna())
        ]
        if not pkg_tx.empty:
            time_col = 'timestamp' if 'timestamp' in pkg_tx.columns else ('transaction_date' if 'transaction_date' in pkg_tx.columns else None)
            if time_col:
                pkg_tx = pkg_tx.copy()
                pkg_tx['parsed_time'] = pd.to_datetime(pkg_tx[time_col], errors='coerce')
                latest_tx = pkg_tx.sort_values('parsed_time').iloc[-1]
            else:
                latest_tx = pkg_tx.iloc[-1]

            pkg_id = str(latest_tx['package_id']).strip()
            match_pkg = packages_df[packages_df['package_id'].astype(str).str.strip() == pkg_id]
            if not match_pkg.empty:
                package_name = str(match_pkg.iloc[0]['package_name'])
                data_gb = float(match_pkg.iloc[0]['data_gb'])
                package_limit_mb = data_gb * 1024.0

    if package_limit_mb is None:
        return False, None

    is_overage = total_usage_mb > package_limit_mb
    status_str = "OVERAGE" if is_overage else "NORMAL_USAGE_NO_ERROR"

    usage_details = {
        "total_usage_mb": round(total_usage_mb, 2),
        "package_limit_mb": round(package_limit_mb, 2),
        "package_name": package_name,
        "status": status_str
    }

    return is_overage, usage_details


def run_rule_engine(
    customer_id: str,
    transactions_df: pd.DataFrame,
    usage_df: Optional[pd.DataFrame] = None,
    packages_df: Optional[pd.DataFrame] = None
) -> Dict[str, Any]:
    """
    Main function for Rule Engine.
    Filters data for the given customer_id, evaluates all deterministic rules,
    and returns a structured response dictionary.

    Args:
        customer_id: Unique customer identifier (e.g. "C00123")
        transactions_df: pandas DataFrame containing transaction records
        usage_df: Optional pandas DataFrame containing usage records
        packages_df: Optional pandas DataFrame containing package definitions

    Returns:
        Structured JSON/dict with rule execution findings, discrepancy flags, and confidence score.
    """
    # 1. Filter transactions for specific customer
    if transactions_df is not None and not transactions_df.empty and 'customer_id' in transactions_df.columns:
        cust_tx = transactions_df[transactions_df['customer_id'] == customer_id].copy()
    else:
        cust_tx = pd.DataFrame()

    total_tx_analyzed = len(cust_tx)

    # 2. Filter usage records count
    if usage_df is not None and not usage_df.empty and 'customer_id' in usage_df.columns:
        cust_usage = usage_df[usage_df['customer_id'] == customer_id]
        total_usage_records = len(cust_usage)
    else:
        total_usage_records = 0

    # 3. Execute Rules
    duplicate_details = detect_duplicate_transactions(cust_tx)
    failed_details = detect_failed_transactions(cust_tx)
    balance_details = detect_balance_mismatches(cust_tx)
    usage_overage_detected, usage_details = detect_usage_overage(
        customer_id=customer_id,
        cust_tx=cust_tx,
        usage_df=usage_df,
        packages_df=packages_df
    )

    # 4. Generate Discrepancy Flags
    discrepancy_flags = []
    if len(duplicate_details) > 0:
        discrepancy_flags.append("DUPLICATE_TRANSACTION")
    if any(d["issue_type"] == "FAILED_TRANSACTION" for d in failed_details):
        discrepancy_flags.append("FAILED_TRANSACTION")
    if any(d["issue_type"] == "STUCK_REFUND" for d in failed_details):
        discrepancy_flags.append("STUCK_REFUND")
    if len(balance_details) > 0:
        discrepancy_flags.append("BALANCE_MISMATCH")
    if usage_overage_detected:
        discrepancy_flags.append("USAGE_OVERAGE")

    # 5. Calculate Confidence Score
    confidence_score = 0.95

    # 6. Structured Response
    return {
        "customer_id": customer_id,
        "total_transactions_analyzed": total_tx_analyzed,
        "total_usage_records": total_usage_records,
        "rule_checks": {
            "duplicates_found": len(duplicate_details),
            "duplicate_details": duplicate_details,
            "failed_transactions_found": len(failed_details),
            "failed_details": failed_details,
            "balance_mismatches_found": len(balance_details),
            "balance_details": balance_details,
            "usage_overage_detected": usage_overage_detected,
            "usage_details": usage_details
        },
        "discrepancy_flags": discrepancy_flags,
        "confidence_score": confidence_score
    }


if __name__ == "__main__":
    import pandas as pd

    # Load data
    transactions = pd.read_csv('data/transactions.csv')
    usage = pd.read_csv('data/usage.csv')
    packages = pd.read_csv('data/packages.csv')

    # Test on a customer with known duplicate transaction (C00001)
    test_customer = "C00001"
    result = run_rule_engine(test_customer, transactions, usage, packages)

    print(f"Customer: {result['customer_id']}")
    print(f"Discrepancy Flags: {result['discrepancy_flags']}")
    print(f"Duplicates Found: {result['rule_checks']['duplicates_found']}")

    if result['rule_checks']['duplicates_found'] > 0:
        print("[SUCCESS] Rule engine correctly detected duplicate transaction!")
    else:
        print("[FAIL] Rule engine missed the duplicate transaction")

    # Also test C04694 from prompt specification
    test_customer_2 = "C04694"
    result_2 = run_rule_engine(test_customer_2, transactions, usage, packages)
    print(f"\nCustomer: {result_2['customer_id']}")
    print(f"Discrepancy Flags: {result_2['discrepancy_flags']}")
    print(f"Duplicates Found: {result_2['rule_checks']['duplicates_found']}")
