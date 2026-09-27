/**
 * HUTCH ResolvAI - High-Fidelity Telecom Dataset & Scenarios
 * Grounded in CSV datasets (5,000 customers, 1,200 complaints, 50,000 transactions)
 */

export const KPI_METRICS = {
  avgResolutionTime: "32s",
  baselineTime: "8.2m",
  timeSavedPercent: "92%",
  firstContactResolution: "95.4%",
  fcrBaseline: "68.0%",
  anomalyDetectionRate: "98.7%",
  disputesHandledToday: 148,
  autoReconciledToday: 132,
  customerSatisfaction: "4.9 / 5.0"
};

export const CUSTOMER_SCENARIOS = [
  {
    "id": "C00001",
    "name": "Kasun Jayasuriya",
    "phone": "+94 78 300 1000",
    "region": "Northern",
    "customerType": "Prepaid",
    "planId": "Smart 599",
    "planName": "Hutch Smart 599",
    "registrationDate": "2025-02-07",
    "preferredChannel": "Call Center",
    "currentBalance": 850.0,
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000001",
      "loggedTime": "10 mins ago",
      "channel": "Call Center",
      "status": "Investigating",
      "text": "Discrepancy detected in account charges.",
      "category": "Billing Dispute",
      "groundTruth": "Duplicate transaction"
    },
    "primaryAnomaly": "DUPLICATE_TRANSACTION",
    "severity": "CRITICAL",
    "confidenceScore": 0.95,
    "affectedAmount": 499.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Duplicate transaction",
        "detail": "HLR and mediation logs confirm dispute condition: 'Duplicate transaction' for customer C00001."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Call Center: \"Discrepancy detected in account charges....\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Smart 599. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 499.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "REFUND",
      "label": "Approve Reconcile LKR 499.00",
      "amount": 499.0,
      "description": "Direct credit to customer account to resolve Duplicate transaction."
    },
    "usage": {
      "totalDataMb": 1495.5,
      "quotaMb": 10240,
      "percentUsed": 14.6,
      "voiceMin": 51.3,
      "sms": 16,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0005307",
        "time": "2026-06-14 00:11",
        "type": "Package Purchase",
        "amount": 499.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 1345.84,
        "balanceAfter": 846.84,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0005521",
        "time": "2026-08-05 11:53",
        "type": "Recharge",
        "amount": 99.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 4890.95,
        "balanceAfter": 4989.95,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0006582",
        "time": "2026-04-24 19:34",
        "type": "Bill Payment",
        "amount": 199.0,
        "status": "Pending",
        "method": "Hutch App",
        "balanceBefore": 1135.0,
        "balanceAfter": 1135.0,
        "isAnomaly": true,
        "tag": "ANOMALY"
      },
      {
        "id": "T0010114",
        "time": "2026-04-28 14:08",
        "type": "Package Purchase",
        "amount": 500.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3230.76,
        "balanceAfter": 2730.76,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C04694",
    "name": "Dinithi Perera",
    "phone": "+94 78 323 1047",
    "region": "Central",
    "customerType": "Prepaid",
    "planId": "Smart 599",
    "planName": "Hutch Smart 599",
    "registrationDate": "2024-02-29",
    "preferredChannel": "Web",
    "currentBalance": 895.0,
    "avatar": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000851",
      "loggedTime": "17 mins ago",
      "channel": "Web",
      "status": "In Progress",
      "text": "I purchased a Hutch scratch card of Rs. 200, but entering the 14-digit PIN returns an invalid card code error. (Case Ref ID #1851)",
      "category": "Recharge",
      "groundTruth": "Recharge processing failure"
    },
    "primaryAnomaly": "FAILED_TRANSACTION",
    "severity": "HIGH",
    "confidenceScore": 0.959,
    "affectedAmount": 1000.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Recharge processing failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Recharge processing failure' for customer C04694."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Web: \"I purchased a Hutch scratch card of Rs. 200, but entering the 14-digit PIN returns an invalid card code error....\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Smart 599. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 1000.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 1000.00",
      "amount": 1000.0,
      "description": "Direct credit to customer account to resolve Recharge processing failure."
    },
    "usage": {
      "totalDataMb": 2180.0,
      "quotaMb": 10240,
      "percentUsed": 21.3,
      "voiceMin": 53.8,
      "sms": 28,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0000634",
        "time": "2026-02-16 13:18",
        "type": "Package Purchase",
        "amount": 399.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 455.9,
        "balanceAfter": 56.9,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0002706",
        "time": "2026-03-14 20:10",
        "type": "Recharge",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4246.72,
        "balanceAfter": 4545.72,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0010208",
        "time": "2026-01-21 15:09",
        "type": "Package Renewal",
        "amount": 799.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 2411.19,
        "balanceAfter": 1612.19,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0014750",
        "time": "2026-03-04 08:52",
        "type": "Package Purchase",
        "amount": 799.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 1600.01,
        "balanceAfter": 801.01,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C00277",
    "name": "Mohamed Rilwan",
    "phone": "+94 78 346 1094",
    "region": "Eastern",
    "customerType": "Postpaid",
    "planId": "Postpaid 1499",
    "planName": "Hutch Postpaid 1499",
    "registrationDate": "2023-04-12",
    "preferredChannel": "Call Center",
    "currentBalance": 940.0,
    "avatar": "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000003",
      "loggedTime": "24 mins ago",
      "channel": "Call Center",
      "status": "In Progress",
      "text": "Discrepancy detected in account charges.",
      "category": "Billing Dispute",
      "groundTruth": "Duplicate transaction"
    },
    "primaryAnomaly": "DUPLICATE_TRANSACTION",
    "severity": "CRITICAL",
    "confidenceScore": 0.968,
    "affectedAmount": 399.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Duplicate transaction",
        "detail": "HLR and mediation logs confirm dispute condition: 'Duplicate transaction' for customer C00277."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Call Center: \"Discrepancy detected in account charges....\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Postpaid 1499. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 399.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "REFUND",
      "label": "Approve Reconcile LKR 399.00",
      "amount": 399.0,
      "description": "Direct credit to customer account to resolve Duplicate transaction."
    },
    "usage": {
      "totalDataMb": 2128.1,
      "quotaMb": 10240,
      "percentUsed": 20.8,
      "voiceMin": 103.6,
      "sms": 33,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0000045",
        "time": "2026-03-06 02:23",
        "type": "Package Purchase",
        "amount": 99.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 4757.67,
        "balanceAfter": 4658.67,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0008923",
        "time": "2026-01-30 10:55",
        "type": "Refund",
        "amount": 99.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 3789.01,
        "balanceAfter": 3888.01,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0014221",
        "time": "2026-02-06 03:46",
        "type": "Package Purchase",
        "amount": 799.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 962.8,
        "balanceAfter": 163.8,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0019216",
        "time": "2026-07-31 04:05",
        "type": "Refund",
        "amount": 599.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 1834.57,
        "balanceAfter": 2433.57,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C01062",
    "name": "Anura Bandara",
    "phone": "+94 78 369 1141",
    "region": "Eastern",
    "customerType": "Postpaid",
    "planId": "Smart 599",
    "planName": "Hutch Smart 599",
    "registrationDate": "2026-02-18",
    "preferredChannel": "Web",
    "currentBalance": 985.0,
    "avatar": "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000261",
      "loggedTime": "31 mins ago",
      "channel": "Web",
      "status": "Investigating",
      "text": "I completed an online recharge of Rs. 499 via Hutch SelfCare App, but my Hutch account balance remains unchanged.",
      "category": "Recharge",
      "groundTruth": "Recharge processing failure"
    },
    "primaryAnomaly": "FAILED_TRANSACTION",
    "severity": "HIGH",
    "confidenceScore": 0.977,
    "affectedAmount": 347.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Recharge processing failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Recharge processing failure' for customer C01062."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Web: \"I completed an online recharge of Rs. 499 via Hutch SelfCare App, but my Hutch account balance remains unchang...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Smart 599. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 347.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 347.00",
      "amount": 347.0,
      "description": "Direct credit to customer account to resolve Recharge processing failure."
    },
    "usage": {
      "totalDataMb": 572.2,
      "quotaMb": 10240,
      "percentUsed": 5.6,
      "voiceMin": 17.7,
      "sms": 9,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0001838",
        "time": "2026-06-17 10:30",
        "type": "Refund",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 2766.39,
        "balanceAfter": 3065.39,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0004475",
        "time": "2026-01-17 07:52",
        "type": "Package Renewal",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4850.58,
        "balanceAfter": 4551.58,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0013334",
        "time": "2026-08-06 04:47",
        "type": "Bill Payment",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 3890.3,
        "balanceAfter": 3890.3,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0016667",
        "time": "2026-05-05 07:36",
        "type": "Package Purchase",
        "amount": 1000.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 571.5,
        "balanceAfter": 0.0,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C02105",
    "name": "Dilshan Fernando",
    "phone": "+94 78 392 1188",
    "region": "North Central",
    "customerType": "Postpaid",
    "planId": "Smart 399",
    "planName": "Hutch Smart 399",
    "registrationDate": "2025-12-30",
    "preferredChannel": "App",
    "currentBalance": 1030.0,
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000021",
      "loggedTime": "38 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "I was charged twice on my payment card for a single activation of the Hutch Night Unlimited Data Pack through Hutch SelfCare App.",
      "category": "Transaction",
      "groundTruth": "Duplicate transaction"
    },
    "primaryAnomaly": "DUPLICATE_TRANSACTION",
    "severity": "CRITICAL",
    "confidenceScore": 0.986,
    "affectedAmount": 399.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Duplicate transaction",
        "detail": "HLR and mediation logs confirm dispute condition: 'Duplicate transaction' for customer C02105."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"I was charged twice on my payment card for a single activation of the Hutch Night Unlimited Data Pack through ...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Smart 399. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 399.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "REFUND",
      "label": "Approve Reconcile LKR 399.00",
      "amount": 399.0,
      "description": "Direct credit to customer account to resolve Duplicate transaction."
    },
    "usage": {
      "totalDataMb": 857.6,
      "quotaMb": 10240,
      "percentUsed": 8.4,
      "voiceMin": 63.4,
      "sms": 22,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0000567",
        "time": "2026-06-16 08:26",
        "type": "Recharge",
        "amount": 399.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3023.54,
        "balanceAfter": 3422.54,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0011609",
        "time": "2026-03-27 08:15",
        "type": "Bill Payment",
        "amount": 1000.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4588.28,
        "balanceAfter": 4588.28,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0012638",
        "time": "2026-01-01 09:26",
        "type": "Package Renewal",
        "amount": 799.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 602.51,
        "balanceAfter": 0.0,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0013084",
        "time": "2026-01-25 21:45",
        "type": "Package Purchase",
        "amount": 599.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 287.07,
        "balanceAfter": 0.0,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C03619",
    "name": "Tharindu Senanayake",
    "phone": "+94 78 415 1235",
    "region": "Northern",
    "customerType": "Postpaid",
    "planId": "Smart 599",
    "planName": "Hutch Smart 599",
    "registrationDate": "2025-11-12",
    "preferredChannel": "Call Center",
    "currentBalance": 1075.0,
    "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000001",
      "loggedTime": "45 mins ago",
      "channel": "Call Center",
      "status": "In Progress",
      "text": "I activated the Hutch 30-Day Unlimited Data Pack via Hutch SelfCare App, but the package was not credited to my line even though payment was successful.",
      "category": "Package",
      "groundTruth": "Package provisioning failure"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.95,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package provisioning failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package provisioning failure' for customer C03619."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Call Center: \"I activated the Hutch 30-Day Unlimited Data Pack via Hutch SelfCare App, but the package was not credited to m...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Smart 599. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package provisioning failure."
    },
    "usage": {
      "totalDataMb": 2605.5,
      "quotaMb": 10240,
      "percentUsed": 25.4,
      "voiceMin": 70.7,
      "sms": 35,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0001429",
        "time": "2026-03-22 23:40",
        "type": "Recharge",
        "amount": 1000.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 2003.13,
        "balanceAfter": 3003.13,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0002253",
        "time": "2026-08-30 12:06",
        "type": "Refund",
        "amount": 99.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 927.47,
        "balanceAfter": 1026.47,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0006369",
        "time": "2026-02-19 08:19",
        "type": "Recharge",
        "amount": 99.0,
        "status": "Failed",
        "method": "Bank Transfer",
        "balanceBefore": 2506.18,
        "balanceAfter": 2506.18,
        "isAnomaly": true,
        "tag": "ANOMALY"
      },
      {
        "id": "T0012825",
        "time": "2026-08-08 07:46",
        "type": "Package Renewal",
        "amount": 599.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 811.78,
        "balanceAfter": 212.78,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C02003",
    "name": "Niroshan De Silva",
    "phone": "+94 78 438 1282",
    "region": "Uva",
    "customerType": "Postpaid",
    "planId": "Starter",
    "planName": "Hutch Starter",
    "registrationDate": "2023-01-07",
    "preferredChannel": "App",
    "currentBalance": 1120.0,
    "avatar": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000002",
      "loggedTime": "52 mins ago",
      "channel": "App",
      "status": "Investigating",
      "text": "My Hutch Work & Study 30-Day Bundle shows active status in the system, but mobile internet is completely disconnected.",
      "category": "Package",
      "groundTruth": "Package provisioning failure"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.959,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package provisioning failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package provisioning failure' for customer C02003."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"My Hutch Work & Study 30-Day Bundle shows active status in the system, but mobile internet is completely disco...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Starter. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package provisioning failure."
    },
    "usage": {
      "totalDataMb": 1804.6,
      "quotaMb": 10240,
      "percentUsed": 17.6,
      "voiceMin": 76.1,
      "sms": 22,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0003545",
        "time": "2026-05-19 00:26",
        "type": "Package Renewal",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4455.76,
        "balanceAfter": 4156.76,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0015758",
        "time": "2026-08-08 01:39",
        "type": "Recharge",
        "amount": 1000.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 3093.26,
        "balanceAfter": 4093.26,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0029024",
        "time": "2026-03-15 05:30",
        "type": "Recharge",
        "amount": 799.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 3169.96,
        "balanceAfter": 3968.96,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0030441",
        "time": "2026-02-05 20:38",
        "type": "Recharge",
        "amount": 399.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 871.83,
        "balanceAfter": 1270.83,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C03771",
    "name": "Fathima Rifka",
    "phone": "+94 78 461 1329",
    "region": "Western",
    "customerType": "Prepaid",
    "planId": "Unlimited 999",
    "planName": "Hutch Unlimited 999",
    "registrationDate": "2024-03-30",
    "preferredChannel": "App",
    "currentBalance": 1165.0,
    "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000003",
      "loggedTime": "59 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "I subscribed to the Hutch Night Unlimited Data Pack, but my data usage is deducting from my main cash balance instead of the package quota.",
      "category": "Package",
      "groundTruth": "Package provisioning failure"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.968,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package provisioning failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package provisioning failure' for customer C03771."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"I subscribed to the Hutch Night Unlimited Data Pack, but my data usage is deducting from my main cash balance ...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Unlimited 999. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package provisioning failure."
    },
    "usage": {
      "totalDataMb": 3048.0,
      "quotaMb": 10240,
      "percentUsed": 29.8,
      "voiceMin": 78.0,
      "sms": 47,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0001081",
        "time": "2026-06-22 13:20",
        "type": "Package Purchase",
        "amount": 1499.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 4479.01,
        "balanceAfter": 2980.01,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0035390",
        "time": "2026-03-06 14:02",
        "type": "Refund",
        "amount": 499.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4268.99,
        "balanceAfter": 4767.99,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0039557",
        "time": "2026-07-11 14:27",
        "type": "Bill Payment",
        "amount": 499.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 1308.42,
        "balanceAfter": 1308.42,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0045560",
        "time": "2026-07-07 20:19",
        "type": "Recharge",
        "amount": 500.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 1852.45,
        "balanceAfter": 2352.45,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C01122",
    "name": "Samanthi Rajapaksha",
    "phone": "+94 78 484 1376",
    "region": "North Western",
    "customerType": "Postpaid",
    "planId": "Smart 399",
    "planName": "Hutch Smart 399",
    "registrationDate": "2025-03-16",
    "preferredChannel": "App",
    "currentBalance": 1210.0,
    "avatar": "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000004",
      "loggedTime": "11 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "The remaining balance for my Hutch Work From Home Data Pack is not displaying correctly in the Hutch Self Care App.",
      "category": "Package",
      "groundTruth": "Package activation delay"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.977,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package activation delay",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package activation delay' for customer C01122."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"The remaining balance for my Hutch Work From Home Data Pack is not displaying correctly in the Hutch Self Care...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Smart 399. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package activation delay."
    },
    "usage": {
      "totalDataMb": 1161.4,
      "quotaMb": 10240,
      "percentUsed": 11.3,
      "voiceMin": 25.0,
      "sms": 16,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0015992",
        "time": "2026-02-15 00:15",
        "type": "Package Purchase",
        "amount": 599.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 735.59,
        "balanceAfter": 136.59,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0018204",
        "time": "2026-06-20 04:48",
        "type": "Recharge",
        "amount": 199.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3392.71,
        "balanceAfter": 3591.71,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0021283",
        "time": "2026-02-10 16:02",
        "type": "Package Renewal",
        "amount": 999.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 2190.28,
        "balanceAfter": 1191.28,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0022606",
        "time": "2026-02-26 22:23",
        "type": "Package Renewal",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 442.17,
        "balanceAfter": 143.17,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C03465",
    "name": "Ruwan Chamara",
    "phone": "+94 78 507 1423",
    "region": "North Western",
    "customerType": "Prepaid",
    "planId": "Smart 399",
    "planName": "Hutch Smart 399",
    "registrationDate": "2025-07-11",
    "preferredChannel": "App",
    "currentBalance": 1255.0,
    "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000005",
      "loggedTime": "18 mins ago",
      "channel": "App",
      "status": "Investigating",
      "text": "I submitted an activation request for the Hutch Rs. 199 Voice & Data Pack, but I received an error SMS and no data was allocated.",
      "category": "Package",
      "groundTruth": "Package activation delay"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.986,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package activation delay",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package activation delay' for customer C03465."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"I submitted an activation request for the Hutch Rs. 199 Voice & Data Pack, but I received an error SMS and no ...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Smart 399. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package activation delay."
    },
    "usage": {
      "totalDataMb": 1381.2,
      "quotaMb": 10240,
      "percentUsed": 13.5,
      "voiceMin": 86.6,
      "sms": 32,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0008121",
        "time": "2026-07-26 23:59",
        "type": "Recharge",
        "amount": 500.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4552.13,
        "balanceAfter": 5052.13,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0012941",
        "time": "2026-07-25 03:44",
        "type": "Recharge",
        "amount": 199.0,
        "status": "Failed",
        "method": "USSD",
        "balanceBefore": 1061.45,
        "balanceAfter": 1061.45,
        "isAnomaly": true,
        "tag": "ANOMALY"
      },
      {
        "id": "T0014767",
        "time": "2026-07-22 21:16",
        "type": "Bill Payment",
        "amount": 99.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 1663.59,
        "balanceAfter": 1663.59,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0015453",
        "time": "2026-05-12 04:15",
        "type": "Recharge",
        "amount": 99.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 1883.52,
        "balanceAfter": 1982.52,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C03661",
    "name": "Dhanushka Wickrama",
    "phone": "+94 78 530 1470",
    "region": "Western",
    "customerType": "Prepaid",
    "planId": "Unlimited 999",
    "planName": "Hutch Unlimited 999",
    "registrationDate": "2026-07-23",
    "preferredChannel": "App",
    "currentBalance": 1300.0,
    "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000006",
      "loggedTime": "25 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "The validity period of my Hutch International Roaming Data Pack expired much earlier than the promised 30-day term.",
      "category": "Package",
      "groundTruth": "Package provisioning failure"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.95,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package provisioning failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package provisioning failure' for customer C03661."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"The validity period of my Hutch International Roaming Data Pack expired much earlier than the promised 30-day ...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Unlimited 999. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package provisioning failure."
    },
    "usage": {
      "totalDataMb": 246.7,
      "quotaMb": 10240,
      "percentUsed": 2.4,
      "voiceMin": 9.8,
      "sms": 5,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0004362",
        "time": "2026-03-10 15:24",
        "type": "Package Purchase",
        "amount": 399.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3808.76,
        "balanceAfter": 3409.76,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0018837",
        "time": "2026-01-09 02:59",
        "type": "Package Purchase",
        "amount": 599.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 3691.89,
        "balanceAfter": 3092.89,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0023763",
        "time": "2026-06-06 20:25",
        "type": "Bill Payment",
        "amount": 299.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 1195.95,
        "balanceAfter": 1195.95,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0028252",
        "time": "2026-05-17 08:48",
        "type": "Bill Payment",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 3493.89,
        "balanceAfter": 3493.89,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C02139",
    "name": "Chamari Atapattu",
    "phone": "+94 78 553 1517",
    "region": "North Western",
    "customerType": "Prepaid",
    "planId": "Postpaid 1499",
    "planName": "Hutch Postpaid 1499",
    "registrationDate": "2023-07-20",
    "preferredChannel": "App",
    "currentBalance": 1345.0,
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000007",
      "loggedTime": "32 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "I dialed USSD code to activate Hutch 30-Day Unlimited Data Pack, but received a server timeout message while money was debited.",
      "category": "Package",
      "groundTruth": "Package activation delay"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.959,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package activation delay",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package activation delay' for customer C02139."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"I dialed USSD code to activate Hutch 30-Day Unlimited Data Pack, but received a server timeout message while m...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Postpaid 1499. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package activation delay."
    },
    "usage": {
      "totalDataMb": 1775.5,
      "quotaMb": 10240,
      "percentUsed": 17.3,
      "voiceMin": 50.6,
      "sms": 33,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0006716",
        "time": "2026-02-27 21:02",
        "type": "Recharge",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 252.86,
        "balanceAfter": 551.86,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0017265",
        "time": "2026-08-31 06:46",
        "type": "Package Purchase",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 1500.33,
        "balanceAfter": 1201.33,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0023210",
        "time": "2026-04-20 14:27",
        "type": "Package Purchase",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4874.23,
        "balanceAfter": 4575.23,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0026876",
        "time": "2026-06-16 07:44",
        "type": "Package Purchase",
        "amount": 199.0,
        "status": "Failed",
        "method": "Bank Card",
        "balanceBefore": 1883.07,
        "balanceAfter": 1883.07,
        "isAnomaly": true,
        "tag": "ANOMALY"
      }
    ]
  },
  {
    "id": "C02393",
    "name": "Pradeep Kumara",
    "phone": "+94 78 576 1564",
    "region": "Eastern",
    "customerType": "Prepaid",
    "planId": "Starter",
    "planName": "Hutch Starter",
    "registrationDate": "2024-04-24",
    "preferredChannel": "Call Center",
    "currentBalance": 1390.0,
    "avatar": "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000008",
      "loggedTime": "39 mins ago",
      "channel": "Call Center",
      "status": "Investigating",
      "text": "I purchased the Hutch Work & Study 30-Day Bundle, but off-peak night time data is not working between midnight and 8 AM.",
      "category": "Package",
      "groundTruth": "Package provisioning failure"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.968,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package provisioning failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package provisioning failure' for customer C02393."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Call Center: \"I purchased the Hutch Work & Study 30-Day Bundle, but off-peak night time data is not working between midnight...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Starter. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package provisioning failure."
    },
    "usage": {
      "totalDataMb": 2426.8,
      "quotaMb": 10240,
      "percentUsed": 23.7,
      "voiceMin": 89.8,
      "sms": 35,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0000686",
        "time": "2026-06-10 21:14",
        "type": "Recharge",
        "amount": 199.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 2137.32,
        "balanceAfter": 2336.32,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0006053",
        "time": "2026-08-11 13:36",
        "type": "Recharge",
        "amount": 199.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 2393.97,
        "balanceAfter": 2592.97,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0007531",
        "time": "2026-01-17 08:17",
        "type": "Recharge",
        "amount": 399.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 476.23,
        "balanceAfter": 875.23,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0016970",
        "time": "2026-07-08 11:22",
        "type": "Recharge",
        "amount": 1499.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3083.6,
        "balanceAfter": 4582.6,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C04127",
    "name": "Imesha Sandamali",
    "phone": "+94 78 599 1611",
    "region": "North Western",
    "customerType": "Prepaid",
    "planId": "Smart 599",
    "planName": "Hutch Smart 599",
    "registrationDate": "2024-06-13",
    "preferredChannel": "Call Center",
    "currentBalance": 1435.0,
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000009",
      "loggedTime": "46 mins ago",
      "channel": "Call Center",
      "status": "In Progress",
      "text": "The voice bundle minutes for my Hutch Night Unlimited Data Pack were not credited after completing the payment.",
      "category": "Package",
      "groundTruth": "Package activation delay"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.977,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package activation delay",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package activation delay' for customer C04127."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Call Center: \"The voice bundle minutes for my Hutch Night Unlimited Data Pack were not credited after completing the payment...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Smart 599. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package activation delay."
    },
    "usage": {
      "totalDataMb": 2164.0,
      "quotaMb": 10240,
      "percentUsed": 21.1,
      "voiceMin": 84.9,
      "sms": 45,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0003894",
        "time": "2026-06-10 12:44",
        "type": "Recharge",
        "amount": 499.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 4693.51,
        "balanceAfter": 5192.51,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0009096",
        "time": "2026-01-21 21:24",
        "type": "Package Purchase",
        "amount": 799.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 491.05,
        "balanceAfter": 0.0,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0016169",
        "time": "2026-03-19 02:47",
        "type": "Recharge",
        "amount": 99.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3031.62,
        "balanceAfter": 3130.62,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0020667",
        "time": "2026-06-17 14:30",
        "type": "Recharge",
        "amount": 1000.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 436.43,
        "balanceAfter": 1436.43,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C01396",
    "name": "Sachintha Madushan",
    "phone": "+94 78 622 1658",
    "region": "North Western",
    "customerType": "Postpaid",
    "planId": "Smart 599",
    "planName": "Hutch Smart 599",
    "registrationDate": "2026-06-18",
    "preferredChannel": "App",
    "currentBalance": 1480.0,
    "avatar": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000010",
      "loggedTime": "53 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "My internet speed on the Hutch Work From Home Data Pack is restricted to 2G speeds immediately after activation.",
      "category": "Package",
      "groundTruth": "Package provisioning failure"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.986,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Package provisioning failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Package provisioning failure' for customer C01396."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"My internet speed on the Hutch Work From Home Data Pack is restricted to 2G speeds immediately after activatio...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Smart 599. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Package provisioning failure."
    },
    "usage": {
      "totalDataMb": 426.0,
      "quotaMb": 10240,
      "percentUsed": 4.2,
      "voiceMin": 68.0,
      "sms": 26,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0010865",
        "time": "2026-08-13 06:27",
        "type": "Bill Payment",
        "amount": 299.0,
        "status": "Failed",
        "method": "Bank Transfer",
        "balanceBefore": 4157.75,
        "balanceAfter": 4157.75,
        "isAnomaly": true,
        "tag": "ANOMALY"
      },
      {
        "id": "T0021305",
        "time": "2026-07-01 07:51",
        "type": "Package Renewal",
        "amount": 499.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 657.7,
        "balanceAfter": 158.7,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0022539",
        "time": "2026-07-08 18:36",
        "type": "Package Purchase",
        "amount": 1000.0,
        "status": "Failed",
        "method": "Bank Transfer",
        "balanceBefore": 694.26,
        "balanceAfter": 694.26,
        "isAnomaly": true,
        "tag": "ANOMALY"
      },
      {
        "id": "T0023862",
        "time": "2026-07-07 20:40",
        "type": "Recharge",
        "amount": 499.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 2123.01,
        "balanceAfter": 2622.01,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C04397",
    "name": "Sanduni Wickramasinghe",
    "phone": "+94 78 645 1705",
    "region": "North Western",
    "customerType": "Prepaid",
    "planId": "Starter",
    "planName": "Hutch Starter",
    "registrationDate": "2024-07-16",
    "preferredChannel": "App",
    "currentBalance": 1525.0,
    "avatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000013",
      "loggedTime": "60 mins ago",
      "channel": "App",
      "status": "Investigating",
      "text": "I completed an online recharge of Rs. 100 via EzCash / MCash App, but my Hutch account balance remains unchanged.",
      "category": "Recharge",
      "groundTruth": "Recharge processing failure"
    },
    "primaryAnomaly": "FAILED_TRANSACTION",
    "severity": "HIGH",
    "confidenceScore": 0.95,
    "affectedAmount": 100.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Recharge processing failure",
        "detail": "HLR and mediation logs confirm dispute condition: 'Recharge processing failure' for customer C04397."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"I completed an online recharge of Rs. 100 via EzCash / MCash App, but my Hutch account balance remains unchang...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Starter. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 100.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 100.00",
      "amount": 100.0,
      "description": "Direct credit to customer account to resolve Recharge processing failure."
    },
    "usage": {
      "totalDataMb": 950.4,
      "quotaMb": 10240,
      "percentUsed": 9.3,
      "voiceMin": 75.5,
      "sms": 22,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0003878",
        "time": "2026-04-20 01:49",
        "type": "Recharge",
        "amount": 299.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 389.15,
        "balanceAfter": 688.15,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0006919",
        "time": "2026-05-17 00:42",
        "type": "Recharge",
        "amount": 599.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 3685.43,
        "balanceAfter": 4284.43,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0008862",
        "time": "2026-08-29 09:22",
        "type": "Package Purchase",
        "amount": 499.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 2392.0,
        "balanceAfter": 1893.0,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0012286",
        "time": "2026-07-06 21:28",
        "type": "Recharge",
        "amount": 799.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 3806.13,
        "balanceAfter": 4605.13,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C02556",
    "name": "Chamath Bandara",
    "phone": "+94 78 668 1752",
    "region": "Uva",
    "customerType": "Postpaid",
    "planId": "Smart 399",
    "planName": "Hutch Smart 399",
    "registrationDate": "2025-01-31",
    "preferredChannel": "Call Center",
    "currentBalance": 1570.0,
    "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000016",
      "loggedTime": "12 mins ago",
      "channel": "Call Center",
      "status": "In Progress",
      "text": "I performed a top-up of Rs. 347 via Scratch Card Top-Up, but it took over 6 hours for the funds to reflect on my Hutch account.",
      "category": "Recharge",
      "groundTruth": "Delayed balance update"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.959,
    "affectedAmount": 347.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Delayed balance update",
        "detail": "HLR and mediation logs confirm dispute condition: 'Delayed balance update' for customer C02556."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via Call Center: \"I performed a top-up of Rs. 347 via Scratch Card Top-Up, but it took over 6 hours for the funds to reflect on ...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Postpaid plan Smart 399. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 347.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 347.00",
      "amount": 347.0,
      "description": "Direct credit to customer account to resolve Delayed balance update."
    },
    "usage": {
      "totalDataMb": 2281.4,
      "quotaMb": 10240,
      "percentUsed": 22.3,
      "voiceMin": 128.7,
      "sms": 33,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0002176",
        "time": "2026-03-26 11:33",
        "type": "Package Renewal",
        "amount": 399.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 3465.3,
        "balanceAfter": 3066.3,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0017015",
        "time": "2026-05-29 00:20",
        "type": "Package Purchase",
        "amount": 299.0,
        "status": "Pending",
        "method": "Hutch App",
        "balanceBefore": 2355.5,
        "balanceAfter": 2355.5,
        "isAnomaly": true,
        "tag": "ANOMALY"
      },
      {
        "id": "T0022273",
        "time": "2026-02-22 01:44",
        "type": "Package Renewal",
        "amount": 99.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3830.57,
        "balanceAfter": 3731.57,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0024186",
        "time": "2026-02-19 15:43",
        "type": "Bill Payment",
        "amount": 499.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 4271.23,
        "balanceAfter": 4271.23,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C02620",
    "name": "Amanda Perera",
    "phone": "+94 78 691 1799",
    "region": "Central",
    "customerType": "Prepaid",
    "planId": "Smart 399",
    "planName": "Hutch Smart 399",
    "registrationDate": "2024-01-08",
    "preferredChannel": "App",
    "currentBalance": 1615.0,
    "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000025",
      "loggedTime": "19 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "My approved refund for a failed Hutch reload of Rs. 100 processed via USSD *102# Reload has not arrived in my account.",
      "category": "Refund",
      "groundTruth": "Failed refund processing"
    },
    "primaryAnomaly": "FAILED_TRANSACTION",
    "severity": "HIGH",
    "confidenceScore": 0.968,
    "affectedAmount": 100.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Failed refund processing",
        "detail": "HLR and mediation logs confirm dispute condition: 'Failed refund processing' for customer C02620."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"My approved refund for a failed Hutch reload of Rs. 100 processed via USSD *102# Reload has not arrived in my ...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Smart 399. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 100.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "REFUND",
      "label": "Approve Reconcile LKR 100.00",
      "amount": 100.0,
      "description": "Direct credit to customer account to resolve Failed refund processing."
    },
    "usage": {
      "totalDataMb": 1716.4,
      "quotaMb": 10240,
      "percentUsed": 16.8,
      "voiceMin": 36.3,
      "sms": 23,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0004812",
        "time": "2026-02-27 12:13",
        "type": "Package Purchase",
        "amount": 1499.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 4597.85,
        "balanceAfter": 3098.85,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0007337",
        "time": "2026-01-02 04:22",
        "type": "Recharge",
        "amount": 1499.0,
        "status": "Success",
        "method": "Bank Transfer",
        "balanceBefore": 2900.7,
        "balanceAfter": 4399.7,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0012039",
        "time": "2026-02-13 19:05",
        "type": "Package Purchase",
        "amount": 599.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 655.33,
        "balanceAfter": 56.33,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0017580",
        "time": "2026-08-21 06:44",
        "type": "Recharge",
        "amount": 1000.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 3845.37,
        "balanceAfter": 4845.37,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C01566",
    "name": "Kaveen Silva",
    "phone": "+94 78 714 1846",
    "region": "Northern",
    "customerType": "Prepaid",
    "planId": "Unlimited 999",
    "planName": "Hutch Unlimited 999",
    "registrationDate": "2024-09-15",
    "preferredChannel": "App",
    "currentBalance": 1660.0,
    "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000028",
      "loggedTime": "26 mins ago",
      "channel": "App",
      "status": "Investigating",
      "text": "My Hutch main balance is automatically decreasing even when mobile data and background sync are turned off.",
      "category": "Billing",
      "groundTruth": "Incorrect deduction"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.977,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Incorrect deduction",
        "detail": "HLR and mediation logs confirm dispute condition: 'Incorrect deduction' for customer C01566."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"My Hutch main balance is automatically decreasing even when mobile data and background sync are turned off....\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Unlimited 999. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Incorrect deduction."
    },
    "usage": {
      "totalDataMb": 478.6,
      "quotaMb": 10240,
      "percentUsed": 4.7,
      "voiceMin": 44.4,
      "sms": 29,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0007326",
        "time": "2026-05-11 10:56",
        "type": "Bill Payment",
        "amount": 499.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 2095.84,
        "balanceAfter": 2095.84,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0009361",
        "time": "2026-02-21 08:15",
        "type": "Recharge",
        "amount": 799.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 1708.0,
        "balanceAfter": 2507.0,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0010407",
        "time": "2026-04-03 00:43",
        "type": "Package Purchase",
        "amount": 399.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 3230.2,
        "balanceAfter": 2831.2,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0012485",
        "time": "2026-02-05 10:07",
        "type": "Package Renewal",
        "amount": 499.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 582.91,
        "balanceAfter": 83.91,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  },
  {
    "id": "C03745",
    "name": "Malith Gunasekara",
    "phone": "+94 78 737 1893",
    "region": "Central",
    "customerType": "Prepaid",
    "planId": "Smart 399",
    "planName": "Hutch Smart 399",
    "registrationDate": "2025-10-04",
    "preferredChannel": "App",
    "currentBalance": 1705.0,
    "avatar": "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&w=150&q=80",
    "ticket": {
      "id": "CP000018",
      "loggedTime": "33 mins ago",
      "channel": "App",
      "status": "In Progress",
      "text": "The online top-up of Rs. 150 was verified by my bank, but my Hutch prepaid main balance still shows zero balance.",
      "category": "Recharge",
      "groundTruth": "Delayed balance update"
    },
    "primaryAnomaly": "BALANCE_MISMATCH",
    "severity": "HIGH",
    "confidenceScore": 0.986,
    "affectedAmount": 199.0,
    "whyTrail": [
      {
        "stage": "DETECT",
        "badgeColor": "bg-red-50 text-red-700 border-red-200",
        "title": "Core Discrepancy: Delayed balance update",
        "detail": "HLR and mediation logs confirm dispute condition: 'Delayed balance update' for customer C03745."
      },
      {
        "stage": "ANALYZE",
        "badgeColor": "bg-amber-50 text-amber-700 border-amber-200",
        "title": "Network Gateway & Ledger Audit",
        "detail": "Customer reported via App: \"The online top-up of Rs. 150 was verified by my bank, but my Hutch prepaid main balance still shows zero balan...\"."
      },
      {
        "stage": "DECIDE",
        "badgeColor": "bg-indigo-50 text-indigo-700 border-indigo-200",
        "title": "Deterministic AI Resolution (97.8%)",
        "detail": "Remediation policy matched for Prepaid plan Smart 399. Verified legitimate dispute."
      },
      {
        "stage": "ACT",
        "badgeColor": "bg-emerald-50 text-emerald-700 border-emerald-200",
        "title": "Reconciliation & Safeguard Issuance",
        "detail": "Execute account credit of LKR 199.00 + dispatch bilingual Trust Receipt via SMS."
      }
    ],
    "recommendedAction": {
      "type": "ADJUSTMENT",
      "label": "Approve Reconcile LKR 199.00",
      "amount": 199.0,
      "description": "Direct credit to customer account to resolve Delayed balance update."
    },
    "usage": {
      "totalDataMb": 2250.3,
      "quotaMb": 10240,
      "percentUsed": 22.0,
      "voiceMin": 41.1,
      "sms": 36,
      "packageLimit": "10.0 GB"
    },
    "transactions": [
      {
        "id": "T0004731",
        "time": "2026-02-17 17:23",
        "type": "Bill Payment",
        "amount": 999.0,
        "status": "Success",
        "method": "Hutch App",
        "balanceBefore": 824.33,
        "balanceAfter": 824.33,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0013733",
        "time": "2026-05-18 00:18",
        "type": "Package Purchase",
        "amount": 399.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 1091.59,
        "balanceAfter": 692.59,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0015308",
        "time": "2026-07-19 22:39",
        "type": "Recharge",
        "amount": 1499.0,
        "status": "Success",
        "method": "USSD",
        "balanceBefore": 3982.87,
        "balanceAfter": 5481.87,
        "isAnomaly": false,
        "tag": "VERIFIED"
      },
      {
        "id": "T0022012",
        "time": "2026-06-14 09:08",
        "type": "Package Purchase",
        "amount": 599.0,
        "status": "Success",
        "method": "Bank Card",
        "balanceBefore": 2923.97,
        "balanceAfter": 2324.97,
        "isAnomaly": false,
        "tag": "VERIFIED"
      }
    ]
  }
];

export const PRESET_CHATS = [
  {
    sender: "agent",
    text: "Can you explain why customer C00001 got charged twice?"
  },
  {
    sender: "copilot",
    text: "Customer C00001 dialed *123# twice within 38 seconds. The first USSD session had a 4-second network latency, leading the customer to retry before receiving confirmation. The charging engine debited both requests, but PCRF only activated one package. This is a confirmed duplicate charge of LKR 499.00."
  },
  {
    sender: "agent",
    text: "What is the recommended resolution?"
  },
  {
    sender: "copilot",
    text: "I recommend executing a 1-Click Instant Refund of LKR 499.00 to their main balance. Once approved, ResolvAI will automatically generate a digital Trust Receipt and dispatch a bilingual SMS to +94 78 812 9401."
  }
];
