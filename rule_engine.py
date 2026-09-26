"""
ResolvAI Copilot - Rule Engine Root Wrapper (rule_engine.py)

Exposes the Rule Engine functions from backend/rule_engine.py.
"""

from backend.rule_engine import (
    run_rule_engine,
    detect_duplicate_transactions,
    detect_failed_transactions,
    detect_balance_mismatches,
    detect_usage_overage,
)

if __name__ == "__main__":
    import pandas as pd

    transactions = pd.read_csv('data/transactions.csv')
    usage = pd.read_csv('data/usage.csv')
    packages = pd.read_csv('data/packages.csv')

    test_customer = "C00001"
    result = run_rule_engine(test_customer, transactions, usage, packages)

    print(f"Customer: {result['customer_id']}")
    print(f"Discrepancy Flags: {result['discrepancy_flags']}")
    print(f"Duplicates Found: {result['rule_checks']['duplicates_found']}")

    if result['rule_checks']['duplicates_found'] > 0:
        print("[SUCCESS] Rule engine correctly detected duplicate transaction!")
    else:
        print("[FAIL] Rule engine missed the duplicate transaction")
