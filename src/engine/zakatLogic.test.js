import { describe, it, expect } from 'vitest';
import { calculateZakat } from './zakatLogic';

const DEFAULT_NISAB = {
    silver: 400,
    gold: 5500,
};

// Helper to get empty inputs
const getEmptyInputs = () => ({
  madhab: 'General',
  cash: { cashOnHand: 0, bankBalance: 0, savings: 0 },
  goldSilver: { goldValue: 0, silverValue: 0, jewelryUsageType: 'personal_use' },
  business: { inventoryValue: 0, businessCash: 0, receivables: 0 },
  investments: { stocksValue: 0, cryptoValue: 0, investmentIntent: 'long_term' },
  liabilities: { shortTermDebt: 0, longTermDebt: 0, billsDue: 0 }
});

describe('Zakat Logic Engine', () => {
  it('should calculate 0 zakat when wealth is below Nisab', () => {
    const inputs = getEmptyInputs();
    inputs.cash.savings = 300; // Below 400 threshold
    
    const result = calculateZakat(inputs, DEFAULT_NISAB.silver);
    expect(result.eligible).toBe(false);
    expect(result.zakatDue).toBe(0);
  });

  it('should calculate 2.5% zakat when wealth is above Nisab', () => {
    const inputs = getEmptyInputs();
    inputs.cash.savings = 1000;
    
    const result = calculateZakat(inputs, DEFAULT_NISAB.silver);
    expect(result.eligible).toBe(true);
    expect(result.zakatDue).toBe(25); // 2.5% of 1000
    expect(result.zakatableWealth).toBe(1000);
  });

  it('should correctly apply Hanafi rules (include jewelry, deduct all debts)', () => {
    const inputs = getEmptyInputs();
    inputs.madhab = 'Hanafi';
    inputs.cash.savings = 5000;
    inputs.goldSilver.goldValue = 2000; // Jewelry included
    inputs.goldSilver.jewelryUsageType = 'personal_use';
    inputs.liabilities.shortTermDebt = 500;
    inputs.liabilities.longTermDebt = 3000; // Deducted
    
    const result = calculateZakat(inputs, DEFAULT_NISAB.silver);
    // Base: 5000 + 2000 = 7000
    // Deduct: 500 + 3000 = 3500
    // Net: 3500
    expect(result.zakatableWealth).toBe(3500);
    expect(result.zakatDue).toBe(3500 * 0.025);
  });

  it("should correctly apply Shafi'i rules", () => {
    const inputs = getEmptyInputs();
    inputs.madhab = "Shafi'i";
    inputs.cash.savings = 5000;
    inputs.goldSilver.goldValue = 2000; // Excluded (personal use)
    inputs.goldSilver.jewelryUsageType = 'personal_use';
    inputs.liabilities.shortTermDebt = 500; // Deducted
    inputs.liabilities.longTermDebt = 3000; // Excluded from deductions
    
    const result = calculateZakat(inputs, DEFAULT_NISAB.silver);
    // Base: 5000
    // Deduct: 500
    // Net: 4500
    expect(result.zakatableWealth).toBe(4500);
    expect(result.zakatDue).toBe(4500 * 0.025);
  });

  it("should include jewelry in Shafi'i if intent is investment", () => {
    const inputs = getEmptyInputs();
    inputs.madhab = "Shafi'i";
    inputs.cash.savings = 5000;
    inputs.goldSilver.goldValue = 2000; 
    inputs.goldSilver.jewelryUsageType = 'investment'; // Included due to intent
    
    const result = calculateZakat(inputs, DEFAULT_NISAB.silver);
    // Base: 5000 + 2000 = 7000
    expect(result.zakatableWealth).toBe(7000);
  });
  
  it('should correctly calculate total deductions and assets', () => {
      const inputs = getEmptyInputs();
      inputs.cash.cashOnHand = 1000;
      inputs.liabilities.billsDue = 500;
      
      const result = calculateZakat(inputs, DEFAULT_NISAB.silver);
      expect(result.totalAssets).toBe(1000);
      expect(result.totalDeductions).toBe(500);
      expect(result.zakatableWealth).toBe(500);
  });
});
