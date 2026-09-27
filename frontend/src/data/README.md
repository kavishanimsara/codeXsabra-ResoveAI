# Hutch ResolveAI — Synthetic Dataset

This dataset is synthetic and created only for prototype development/testing.
It is NOT Hutch customer data and must not be represented as real Hutch data.

Files:
- customers.csv
- packages.csv
- transactions.csv
- usage.csv
- complaints.csv
- data_dictionary.csv

Suggested project relationship:
customers.customer_id
    -> transactions.customer_id
    -> usage.customer_id
    -> complaints.customer_id

transactions.package_id
    -> packages.package_id

The complaints file contains `ground_truth_root_cause` for evaluating root-cause
detection during development. Do not expose this field in the customer-facing UI.

Demo duplicate-transaction cases are included for end-to-end testing.
