/**
 * HUTCH ResolvAI - High-Fidelity Telecom Dataset & Scenarios
 * Grounded in CSV datasets (customers, complaints, packages, transactions, usage)
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
    id: "C00001",
    name: "Kasun Jayasuriya",
    phone: "+94 78 812 9401",
    region: "Northern (Jaffna)",
    customerType: "Prepaid",
    planId: "Smart 599",
    planName: "Hutch Smart Gamer 599",
    registrationDate: "2025-02-07",
    preferredChannel: "Call Center",
    currentBalance: 1000.00,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    ticket: {
      id: "TKT-89021",
      loggedTime: "12 mins ago",
      channel: "USSD / Call Center",
      status: "In Progress",
      text: "I dialed *123# to recharge my data plan for Rs. 499, but my main balance got deducted twice within one minute!",
      category: "Billing Dispute",
      groundTruth: "Duplicate transaction due to USSD session timeout retry."
    },
    primaryAnomaly: "DUPLICATE_TRANSACTION",
    severity: "CRITICAL",
    confidenceScore: 0.984,
    affectedAmount: 499.00,
    whyTrail: [
      {
        stage: "DETECT",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "Dual Identical Deductions Identified",
        detail: "Detected 2 identical debit transactions of LKR 499.00 for package 'PKG005' timestamped 38 seconds apart (11:51:12 & 11:51:50)."
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "USSD Gateway Latency Packet Drop",
        detail: "HLR mediation logs show customer handset re-transmitted the USSD request string before the initial ACK handshake was written to ledger."
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "High-Confidence Erroneous Charge (98.4%)",
        detail: "Second transaction did not provision additional data quota on the PCRF engine, confirming it is an accidental duplicate debit."
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Instant Wallet Credit & Idempotency Safeguard",
        detail: "Recommend instant wallet refund of LKR 499.00 + apply temporary transaction idempotency lock on customer account."
      }
    ],
    recommendedAction: {
      type: "REFUND",
      label: "Approve Instant Refund of LKR 499.00",
      amount: 499.00,
      description: "Direct credit back to prepaid main balance with instant SMS confirmation."
    },
    usage: {
      totalDataMb: 8420,
      quotaMb: 10240,
      percentUsed: 82.2,
      voiceMin: 142.5,
      sms: 28,
      packageLimit: "10.0 GB"
    },
    transactions: [
      {
        id: "TX-990212",
        time: "Today, 11:51:50",
        type: "Package Purchase",
        amount: 499.00,
        status: "Success",
        method: "USSD (*123#)",
        balanceBefore: 1499.00,
        balanceAfter: 1000.00,
        isAnomaly: true,
        tag: "DUPLICATE RETRY"
      },
      {
        id: "TX-990211",
        time: "Today, 11:51:12",
        type: "Package Purchase",
        amount: 499.00,
        status: "Success",
        method: "USSD (*123#)",
        balanceBefore: 1998.00,
        balanceAfter: 1499.00,
        isAnomaly: false,
        tag: "ORIGINAL VALID"
      },
      {
        id: "TX-984102",
        time: "Yesterday, 18:22:10",
        type: "Recharge",
        amount: 1000.00,
        status: "Success",
        method: "Hutch Scratch Card",
        balanceBefore: 998.00,
        balanceAfter: 1998.00,
        isAnomaly: false,
        tag: "VERIFIED"
      },
      {
        id: "TX-972109",
        time: "25 Sep, 10:14:05",
        type: "Data Pack 1GB",
        amount: 99.00,
        status: "Success",
        method: "MyHutch App",
        balanceBefore: 1097.00,
        balanceAfter: 998.00,
        isAnomaly: false,
        tag: "VERIFIED"
      }
    ]
  },
  {
    id: "C04694",
    name: "Dinithi Perera",
    phone: "+94 78 519 2381",
    region: "Western (Colombo 07)",
    customerType: "Prepaid",
    planId: "Hutch MAX 999",
    planName: "Hutch MAX Mega Data",
    registrationDate: "2024-11-12",
    preferredChannel: "MyHutch App",
    currentBalance: 120.50,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    ticket: {
      id: "TKT-89028",
      loggedTime: "24 mins ago",
      channel: "MyHutch App",
      status: "Investigating",
      text: "I did an online debit card reload of Rs. 1000, bank deducted money but my Hutch balance is still empty!",
      category: "Reload Failure",
      groundTruth: "Failed transaction / 3rd party payment gateway sync timeout."
    },
    primaryAnomaly: "FAILED_TRANSACTION",
    severity: "HIGH",
    confidenceScore: 0.968,
    affectedAmount: 1000.00,
    whyTrail: [
      {
        stage: "DETECT",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "Payment Gateway Debit Without Core Balance Credit",
        detail: "Bank payment gateway transaction #PG-49810 recorded HTTP 200 SUCCESS, but core billing transaction failed."
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "Aggregator Webhook Timeout (408)",
        detail: "The payment aggregator webhook timed out after 30 seconds due to a temporary load spike on the Hutch payment listener."
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Genuine Payment Confirmed (96.8%)",
        detail: "Interbank settlement file verifies funds were captured by Hutch account. Customer balance requires immediate manual synchronization."
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Force Balance Top-Up & Courtesy Bonus",
        detail: "Credit LKR 1000.00 reload + grant 1GB complimentary courtesy pack for 45-minute delay."
      }
    ],
    recommendedAction: {
      type: "CREDIT_OVERRIDE",
      label: "Force Credit LKR 1000.00 + Courtesy 1GB Data",
      amount: 1000.00,
      description: "Immediate ledger credit to resolve payment aggregator webhook timeout."
    },
    usage: {
      totalDataMb: 4210,
      quotaMb: 25600,
      percentUsed: 16.4,
      voiceMin: 68.0,
      sms: 12,
      packageLimit: "25.0 GB"
    },
    transactions: [
      {
        id: "TX-781992",
        time: "Today, 10:45:12",
        type: "Online Card Reload",
        amount: 1000.00,
        status: "Failed",
        method: "Commercial Bank IPG",
        balanceBefore: 120.50,
        balanceAfter: 120.50,
        isAnomaly: true,
        tag: "FAILED WEBHOOK"
      },
      {
        id: "TX-771822",
        time: "20 Sep, 14:10:02",
        type: "Package Renewal",
        amount: 999.00,
        status: "Success",
        method: "Prepaid Balance",
        balanceBefore: 1119.50,
        balanceAfter: 120.50,
        isAnomaly: false,
        tag: "VERIFIED"
      }
    ]
  },
  {
    id: "C00277",
    name: "Mohamed Rilwan",
    phone: "+94 78 301 9845",
    region: "Central (Kandy)",
    customerType: "Postpaid",
    planId: "Hutch Freedom 1200",
    planName: "Hutch Freedom Postpaid Pro",
    registrationDate: "2023-08-19",
    preferredChannel: "Self-Care Web",
    currentBalance: -450.00,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    ticket: {
      id: "TKT-89035",
      loggedTime: "1 hour ago",
      channel: "MyHutch App",
      status: "Pending Explanation",
      text: "Why is my bill Rs. 450 higher this month? I haven't changed my usage at all, this is unfair bill shock!",
      category: "Bill Shock",
      groundTruth: "Normal usage exceeded package quota / Pay-As-You-Go standard tariff applied."
    },
    primaryAnomaly: "USAGE_OVERAGE",
    severity: "MEDIUM",
    confidenceScore: 0.942,
    affectedAmount: 450.00,
    whyTrail: [
      {
        stage: "DETECT",
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
        title: "Standard Plan Data Exhaustion at 22nd Day",
        detail: "Customer used 13,840 MB, surpassing their 10,240 MB (10GB) included bundle by 3.5 GB on 22nd September."
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "High Data Consumption Spike (YouTube 4K)",
        detail: "CDR session analysis reveals a 2.8 GB YouTube streaming session at 1080p/4K on Sunday evening after quota had reached 100%."
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Zero Billing Error / Churn Risk Present (94.2%)",
        detail: "Standard out-of-bundle PAYG rate of LKR 0.15/MB was billed correctly. However, customer experienced bill shock due to missing warning SMS."
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "50% Goodwill Waiver + Proactive Plan Upgrade Offer",
        detail: "Grant 50% goodwill discount of LKR 225.00 + propose 1-click migration to Hutch Freedom 1500 (25GB) with no extra deposit."
      }
    ],
    recommendedAction: {
      type: "BILL_SHOCK_REDUCTION",
      label: "Apply 50% Courtesy Waiver (LKR 225.00) & Upgrade Plan",
      amount: 225.00,
      description: "Prevent churn by waiving half the overage and migrating to auto-capping plan."
    },
    usage: {
      totalDataMb: 13840,
      quotaMb: 10240,
      percentUsed: 135.1,
      voiceMin: 320.0,
      sms: 55,
      packageLimit: "10.0 GB (3.5 GB Overage)"
    },
    transactions: [
      {
        id: "TX-661002",
        time: "24 Sep, 23:59:00",
        type: "Out-of-Bundle Data Charge",
        amount: 450.00,
        status: "Billed",
        method: "Postpaid Ledger",
        balanceBefore: 0.00,
        balanceAfter: -450.00,
        isAnomaly: true,
        tag: "OVERAGE PAYG"
      },
      {
        id: "TX-651200",
        time: "01 Sep, 00:00:00",
        type: "Monthly Rental",
        amount: 1200.00,
        status: "Paid",
        method: "Bank Standing Order",
        balanceBefore: 0.00,
        balanceAfter: 0.00,
        isAnomaly: false,
        tag: "BASE RENTAL"
      }
    ]
  },
  {
    id: "C01062",
    name: "Chamari Atapattu",
    phone: "+94 78 948 1102",
    region: "Southern (Galle)",
    customerType: "Prepaid",
    planId: "Hutch Social Unlimited",
    planName: "Hutch Non-Stop TikTok + YT",
    registrationDate: "2024-05-18",
    preferredChannel: "WhatsApp Care",
    currentBalance: 340.00,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    ticket: {
      id: "TKT-89042",
      loggedTime: "2 hours ago",
      channel: "WhatsApp Bot",
      status: "Open",
      text: "My balance shows Rs. 340, but according to my calculations it should be Rs. 490. Where did Rs. 150 go?",
      category: "Balance Ledger Delay",
      groundTruth: "Delayed CDR mediation synchronization."
    },
    primaryAnomaly: "BALANCE_MISMATCH",
    severity: "MEDIUM",
    confidenceScore: 0.951,
    affectedAmount: 150.00,
    whyTrail: [
      {
        stage: "DETECT",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "LKR 150 Ledger Variance Detected",
        detail: "Transaction sequence analysis shows balance_after does not match (balance_before - amount) formula."
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "Midnight Batch File Re-indexing",
        detail: "Off-peak batch mediation lagged by 140 minutes, causing a temporary display discrepancy on the self-care app."
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Account Corrected in Core but Delayed on App (95.1%)",
        detail: "Actual account balance on Hutch Core OCS is already reconciled; customer view was stale."
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Force App Cache Invalidation + Send Real-Time SMS",
        detail: "Trigger real-time balance SMS to customer and flush MyHutch session cache."
      }
    ],
    recommendedAction: {
      type: "SYNC_AND_EXPLAIN",
      label: "Force App Balance Resync & Send SMS Breakdown",
      amount: 0.00,
      description: "No financial deduction required; system has auto-corrected."
    },
    usage: {
      totalDataMb: 6140,
      quotaMb: 8192,
      percentUsed: 74.9,
      voiceMin: 95.0,
      sms: 18,
      packageLimit: "8.0 GB"
    },
    transactions: [
      {
        id: "TX-551010",
        time: "Yesterday, 23:45:00",
        type: "Batch Reconcile",
        amount: 150.00,
        status: "Completed",
        method: "Core Mediation",
        balanceBefore: 490.00,
        balanceAfter: 340.00,
        isAnomaly: true,
        tag: "DELAYED SYNC"
      }
    ]
  },
  {
    id: "C02105",
    name: "Dilshan Fernando",
    phone: "+94 78 412 8840",
    region: "North Central (Anuradhapura)",
    customerType: "Postpaid",
    planId: "Smart 399",
    planName: "Hutch Night Unlimited 399",
    registrationDate: "2024-05-18",
    preferredChannel: "MyHutch App",
    currentBalance: 820.00,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    ticket: {
      id: "CP000021",
      loggedTime: "18 mins ago",
      channel: "MyHutch App",
      status: "In Progress",
      text: "I was charged twice on my payment card for a single activation of the Hutch Night Unlimited Data Pack.",
      category: "Billing Dispute",
      groundTruth: "Duplicate transaction on payment gateway."
    },
    primaryAnomaly: "DUPLICATE_TRANSACTION",
    severity: "CRITICAL",
    confidenceScore: 0.991,
    affectedAmount: 399.00,
    whyTrail: [
      {
        stage: "DETECT",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "Dual Payment Gateway Authorization",
        detail: "Detected 2 credit card debits of LKR 399.00 within 22 seconds for Hutch Night Unlimited Pack."
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "Payment Gateway Retransmission",
        detail: "Payment switch received dual callback hooks due to network retries before session clearance."
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Single Package Provisioned (99.1%)",
        detail: "PCRF confirmed only 1 night unlimited entitlement was granted. Second debit is 100% duplicate."
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Direct Reversal & SMS Notification",
        detail: "Auto-revert LKR 399.00 to card account and issue digital Trust Receipt with USSD guard."
      }
    ],
    recommendedAction: {
      type: "REFUND",
      label: "Refund LKR 399.00 Duplicate Card Charge",
      amount: 399.00,
      description: "Direct credit back to customer account for duplicate Night Unlimited Pack activation."
    },
    usage: {
      totalDataMb: 12400,
      quotaMb: 30720,
      percentUsed: 40.3,
      voiceMin: 85.0,
      sms: 14,
      packageLimit: "Night Unlimited"
    },
    transactions: [
      {
        id: "TX-771201",
        time: "Today, 02:15:22",
        type: "Package Activation",
        amount: 399.00,
        status: "Success",
        method: "Payment Card",
        balanceBefore: 820.00,
        balanceAfter: 421.00,
        isAnomaly: true,
        tag: "DUPLICATE CARD CHARGE"
      },
      {
        id: "TX-771200",
        time: "Today, 02:15:00",
        type: "Package Activation",
        amount: 399.00,
        status: "Success",
        method: "Payment Card",
        balanceBefore: 1219.00,
        balanceAfter: 820.00,
        isAnomaly: false,
        tag: "VALID ACTIVATION"
      }
    ]
  },
  {
    id: "C03619",
    name: "Tharindu Senanayake",
    phone: "+94 78 920 1145",
    region: "Northern (Kilinochchi)",
    customerType: "Postpaid",
    planId: "Smart 599",
    planName: "Hutch 30-Day Unlimited 999",
    registrationDate: "2024-08-01",
    preferredChannel: "Call Center",
    currentBalance: 450.00,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    ticket: {
      id: "CP000001",
      loggedTime: "32 mins ago",
      channel: "MyHutch App",
      status: "Investigating",
      text: "I activated the Hutch 30-Day Unlimited Data Pack via Hutch SelfCare App, but the package was not credited to my line even though payment was successful.",
      category: "Package Issue",
      groundTruth: "Package provisioning failure."
    },
    primaryAnomaly: "FAILED_TRANSACTION",
    severity: "HIGH",
    confidenceScore: 0.975,
    affectedAmount: 999.00,
    whyTrail: [
      {
        stage: "DETECT",
        badgeColor: "bg-red-50 text-red-700 border-red-200",
        title: "Payment Deducted Without Provisioning",
        detail: "Payment transaction for LKR 999.00 succeeded, but PCRF provisioning queue returned TIMEOUT."
      },
      {
        stage: "ANALYZE",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        title: "Provisioning Broker Queue Hang",
        detail: "HLR mediation worker process timed out during peak hour traffic; bundle quota was not allocated."
      },
      {
        stage: "DECIDE",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        title: "Valid Purchase Requiring Provisioning (97.5%)",
        detail: "Payment confirmed in core billing. Customer line is entitled to instant package provisioning."
      },
      {
        stage: "ACT",
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
        title: "Push Package Activation + 2GB Bonus",
        detail: "Trigger instant PCRF package provisioning and credit courtesy 2GB compensation for delay."
      }
    ],
    recommendedAction: {
      type: "PROVISION_RETRY",
      label: "Force Activate 30-Day Unlimited Data Pack",
      amount: 999.00,
      description: "Direct PCRF queue override to activate the package immediately without extra charge."
    },
    usage: {
      totalDataMb: 120,
      quotaMb: 51200,
      percentUsed: 0.2,
      voiceMin: 45.0,
      sms: 5,
      packageLimit: "50.0 GB"
    },
    transactions: [
      {
        id: "TX-660190",
        time: "Today, 08:00:00",
        type: "Package Activation",
        amount: 999.00,
        status: "Payment Done / PCRF Pending",
        method: "MyHutch App",
        balanceBefore: 1449.00,
        balanceAfter: 450.00,
        isAnomaly: true,
        tag: "PROVISIONING FAILED"
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
