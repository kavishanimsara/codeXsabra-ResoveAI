import os
import json
import hashlib
import pandas as pd
import sys

# Ensure backend path is available
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
from backend.rule_engine import run_rule_engine

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "data"))
transactions_df = pd.read_csv(os.path.join(BASE_DIR, 'transactions.csv'))
usage_df = pd.read_csv(os.path.join(BASE_DIR, 'usage.csv'))
packages_df = pd.read_csv(os.path.join(BASE_DIR, 'packages.csv'))
complaints_df = pd.read_csv(os.path.join(BASE_DIR, 'complaints.csv'))
customers_df = pd.read_csv(os.path.join(BASE_DIR, 'customers.csv'))

tx_by_cust = dict(list(transactions_df.groupby('customer_id')))
us_by_cust = dict(list(usage_df.groupby('customer_id')))
cust_dict = customers_df.set_index('customer_id').to_dict('index')
pkg_dict = packages_df.set_index('package_id').to_dict('index')

NAMES_FIRST = ['Kasun', 'Dinithi', 'Nuwan', 'Chamari', 'Kusal', 'Anura', 'Pathum', 'Dhananjaya', 'Dilshan', 'Maheesh', 'Wanindu', 'Lahiru', 'Ramesh', 'Charith', 'Avishka', 'Sadeera', 'Dunith', 'Niroshan', 'Bhanuka', 'Isuru']
NAMES_LAST = ['Jayasuriya', 'Perera', 'Fernando', 'Atapattu', 'Mendis', 'Kumara', 'Nissanka', 'de Silva', 'Madushanka', 'Theekshana', 'Hasaranga', 'Asalanka', 'Shanaka', 'Samarawickrama', 'Wellalage', 'Vandersay', 'Gunathilaka', 'Dickwella', 'Rajapaksa', 'Senanayake']

KNOWN_NAMES = {
    'C00001': 'Kasun Jayasuriya',
    'C04694': 'Dinithi Perera',
    'C01102': 'Nuwan Fernando',
    'C00892': 'Chamari Atapattu'
}

AVATARS = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?auto=format&fit=crop&w=150&q=80'
]

scenarios = []
for idx, row in complaints_df.head(10).iterrows():
    cid = str(row['customer_id'])
    c_info = cust_dict.get(cid, {})
    h_val = int(hashlib.md5(cid.encode()).hexdigest(), 16)

    name = KNOWN_NAMES.get(cid, f"{NAMES_FIRST[h_val % len(NAMES_FIRST)]} {NAMES_LAST[(h_val // 7) % len(NAMES_LAST)]}")
    phone = f"+94 78 {(h_val % 800) + 100:03d} {(h_val % 8000) + 1000:04d}"
    avatar = AVATARS[h_val % len(AVATARS)]

    ctx = tx_by_cust.get(cid, pd.DataFrame())
    cus = us_by_cust.get(cid, pd.DataFrame())

    facts = run_rule_engine(cid, ctx, cus, packages_df)

    flags = facts.get('discrepancy_flags', [])
    primary_anomaly = flags[0] if flags else 'NORMAL'
    rc = facts.get('rule_checks', {})
    
    affected_amount = 499.0
    if rc.get('duplicate_details'):
        affected_amount = float(rc['duplicate_details'][0].get('amount', 499.0))
    elif rc.get('failed_details'):
        affected_amount = float(rc['failed_details'][0].get('amount', 299.0))
    elif rc.get('balance_details'):
        affected_amount = float(rc['balance_details'][0].get('difference', 99.0))

    tx_list = []
    if not ctx.empty:
        for _, t in ctx.head(10).iterrows():
            st = str(t.get('status', '')).strip()
            is_anom = st.lower() in ['failed', 'pending'] or (primary_anomaly == 'DUPLICATE_TRANSACTION' and float(t.get('amount', 0)) == affected_amount)
            tx_list.append({
                'id': str(t.get('transaction_id', '')),
                'time': str(t.get('timestamp', '')),
                'type': str(t.get('transaction_type', '')),
                'amount': float(t.get('amount', 0)),
                'status': st,
                'method': str(t.get('payment_method', '')),
                'balanceBefore': float(t.get('balance_before', 0)),
                'balanceAfter': float(t.get('balance_after', 0)),
                'isAnomaly': is_anom,
                'tag': 'ANOMALY' if is_anom else 'VERIFIED'
            })

    current_balance = tx_list[-1]['balanceAfter'] if tx_list else 850.0

    tot_mb = float(cus['data_mb'].sum()) if not cus.empty else 1495.5
    tot_min = float(cus['voice_minutes'].sum()) if not cus.empty else 51.3
    tot_sms = int(cus['sms_count'].sum()) if not cus.empty else 16
    quota_mb = 10240.0
    pct = round((tot_mb / quota_mb) * 100, 1)

    plan_name = f"Hutch {c_info.get('plan_id', 'Smart 599')}"
    complaint_text = str(row.get('complaint_text', ''))

    scenarios.append({
        'id': cid,
        'name': name,
        'phone': phone,
        'region': str(c_info.get('region', 'Northern')),
        'customerType': str(c_info.get('customer_type', 'Prepaid')),
        'planId': str(c_info.get('plan_id', 'Smart 599')),
        'planName': plan_name,
        'registrationDate': str(c_info.get('registration_date', '2025-01-01')),
        'preferredChannel': str(c_info.get('preferred_channel', 'Call Center')),
        'currentBalance': current_balance,
        'avatar': avatar,
        'ticket': {
            'id': str(row.get('complaint_id', '')),
            'loggedTime': '10 mins ago',
            'channel': str(row.get('channel', 'Call Center')),
            'status': str(row.get('status', 'Investigating')),
            'text': complaint_text,
            'category': str(row.get('category', 'Billing Dispute')),
            'groundTruth': str(row.get('ground_truth_root_cause', 'Discrepancy detected'))
        },
        'primaryAnomaly': primary_anomaly,
        'severity': 'CRITICAL' if primary_anomaly == 'DUPLICATE_TRANSACTION' else ('HIGH' if primary_anomaly == 'FAILED_TRANSACTION' else 'MEDIUM'),
        'confidenceScore': facts.get('confidence_score', 0.95),
        'affectedAmount': affected_amount,
        'whyTrail': [
            {
                'stage': 'DETECT',
                'badgeColor': 'bg-red-50 text-red-700 border-red-200',
                'title': f"Core Discrepancy: {primary_anomaly}",
                'detail': f"Rule engine evaluated transactions for customer {cid}. Flags: {primary_anomaly}."
            },
            {
                'stage': 'ANALYZE',
                'badgeColor': 'bg-amber-50 text-amber-700 border-amber-200',
                'title': 'Network Gateway & Ledger Audit',
                'detail': f"Customer reported via {row.get('channel', 'Call Center')}: \"{complaint_text[:60]}...\"."
            },
            {
                'stage': 'DECIDE',
                'badgeColor': 'bg-indigo-50 text-indigo-700 border-indigo-200',
                'title': 'Deterministic AI Resolution (97.8%)',
                'detail': f"Remediation policy matched for {c_info.get('customer_type', 'Prepaid')} plan {c_info.get('plan_id', 'Smart 599')}. Verified dispute."
            },
            {
                'stage': 'ACT',
                'badgeColor': 'bg-emerald-50 text-emerald-700 border-emerald-200',
                'title': 'Reconciliation & Safeguard Issuance',
                'detail': f"Execute account credit of LKR {affected_amount:.2f} + dispatch bilingual Trust Receipt via SMS."
            }
        ],
        'recommendedAction': {
            'type': 'REFUND' if primary_anomaly == 'DUPLICATE_TRANSACTION' else 'ADJUSTMENT',
            'label': f"Approve Reconcile LKR {affected_amount:.2f}",
            'amount': affected_amount,
            'description': f"Direct credit to customer account to resolve {primary_anomaly}."
        },
        'usage': {
            'totalDataMb': tot_mb,
            'quotaMb': quota_mb,
            'percentUsed': pct,
            'voiceMin': tot_min,
            'sms': tot_sms,
            'packageLimit': '10.0 GB'
        },
        'transactions': tx_list
    })

print(f"Successfully generated {len(scenarios)} scenarios!")
print("First scenario:", json.dumps(scenarios[0], indent=2))
