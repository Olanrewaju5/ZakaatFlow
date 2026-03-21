# Zakat Calculator – Madhab-Aware Logic Tree

## 1. Overview
This document defines the logic system for a Zakat Calculator that adapts based on Islamic jurisprudence (madhab).

Supported Madhabs:
- Hanafi
- Maliki
- Shafi’i
- Hanbali
- General (fallback / simplified)

---

## 2. High-Level Flow

START
 → Select Madhab
 → Collect Wealth Inputs
 → Apply Madhab Rules
 → Calculate Net Zakatable Wealth
 → Check Nisab Threshold
 → If ≥ Nisab → Apply 2.5%
 → Output Zakat Due
END

---

## 3. Input Collection

### Cash & Liquid Assets
- cash_on_hand
- bank_balance
- savings

### Gold & Silver
- gold_weight OR gold_value
- silver_weight OR silver_value
- jewelry_usage_type:
  - personal_use
  - investment

### Business Assets
- inventory_value
- business_cash
- receivables

### Investments
- stocks_value
- crypto_value
- investment_intent:
  - trading
  - long_term

### Liabilities
- short_term_debt
- long_term_debt
- bills_due

---

## 4. Madhab Rule Engine

### Hanafi Rules
INCLUDE:
- All gold and silver (including personal jewelry)
- All cash and savings
- Business assets
- Investments

DEDUCT:
- All debts (short-term + long-term)

---

### Maliki Rules
INCLUDE:
- Cash and savings
- Business assets
- Investments

GOLD/SILVER:
- Exclude if personal_use
- Include if investment

DEDUCT:
- Only short-term debts

---

### Shafi’i Rules
INCLUDE:
- Cash and savings
- Business assets

GOLD/SILVER:
- Exclude personal jewelry
- Include if investment/excess

DEDUCT:
- Only immediate debts

---

### Hanbali Rules
INCLUDE:
- Cash and savings
- Business assets

GOLD/SILVER:
- Exclude normal jewelry
- Include if investment

DEDUCT:
- Immediate liabilities only

---

### General Mode
ASSUMPTIONS:
- Exclude personal jewelry
- Include investment assets
- Deduct short-term debts only

---

## 5. Nisab Calculation

Gold Nisab = value of 85g gold  
Silver Nisab = value of 595g silver  

Rule:
IF zakatable_wealth < nisab_threshold:
    zakat_due = 0
ELSE:
    zakat_due = zakatable_wealth × 0.025

---

## 6. Final Calculation Pipeline

STEP 1: Determine madhab  
STEP 2: Normalize all inputs to monetary value  
STEP 3: Apply madhab rules  
STEP 4: Subtract liabilities  
STEP 5: Compute zakatable_wealth  
STEP 6: Compare with Nisab  
STEP 7: Apply 2.5% if eligible  
STEP 8: Output result  

---

## 7. Output Example

{
  "madhab": "Hanafi",
  "zakatable_wealth": 500000,
  "nisab_threshold": 300000,
  "eligible": true,
  "zakat_due": 12500
}

---

END OF DOCUMENT
