/**
 * Zakat Calculator Logic Engine
 * 
 * Implements Madhab-aware rules as defined in zakat_calculator_logic.md
 */

// Hardcoded for MVP as per PRD "default: Silver Nisab". Future: API fetch.
// As an example standard, Silver Nisab = ~ 595g of silver. Gold = ~ 85g of gold.
// Since actual API is not implemented yet, we will use a configurable default.
const DEFAULT_NISAB = {
    silver: 400, // example value in USD, roughly ~595g silver could be 400-500
    gold: 5500,  // example value in USD, roughly ~85g gold
  };
  
  export const calculateZakat = (inputs, nisabThreshold = DEFAULT_NISAB.silver) => {
    const { madhab, cash, goldSilver, business, investments, liabilities } = inputs;
  
    let zakatableWealth = 0;
  
    // 1. Cash & Savings - Included in all Madhabs
    zakatableWealth += (Number(cash.cashOnHand) || 0) + 
                       (Number(cash.bankBalance) || 0) + 
                       (Number(cash.savings) || 0);
  
    // 2. Business Assets - Included in all Madhabs
    zakatableWealth += (Number(business.inventoryValue) || 0) + 
                       (Number(business.businessCash) || 0) + 
                       (Number(business.receivables) || 0);
  
    // 3. Investments 
    // Hanafi, Maliki include all. Shafi'i, Hanbali, General include trading mostly, 
    // but the rules say "General: Include investment assets".
    // For simplicity MVP: we'll include stocks and crypto. 
    // If long term, usually only dividend/profit is zakatable, but for trading intent, full value.
    if (investments.investmentIntent === 'trading') {
        zakatableWealth += (Number(investments.stocksValue) || 0) + (Number(investments.cryptoValue) || 0);
    } else {
        // If long term, some madhabs only tax dividends (which would fall under cash).
        // Let's assume if they input value and say long term, we only include the profit if known.
        // For Hanafi: include all investments usually if they represent zakatable assets.
        if (madhab === 'Hanafi') {
            zakatableWealth += (Number(investments.stocksValue) || 0) + (Number(investments.cryptoValue) || 0);
        } else {
             // For simplify over-complexity, let's include if trading, else 0 (profit should be in cash)
             // Unless they explicitly want to specify investment value to be zakated.
        }
    }
  
    // 4. Gold & Silver - Madhab specific
    const goldValue = Number(goldSilver.goldValue) || 0;
    const silverValue = Number(goldSilver.silverValue) || 0;
    const isJewelryInvestment = goldSilver.jewelryUsageType === 'investment';
  
    switch (madhab) {
      case 'Hanafi':
        // Includes all gold and silver (even personal jewelry)
        zakatableWealth += goldValue + silverValue;
        break;
      
      case 'Maliki':
      case 'Shafi\'i':
      case 'Hanbali':
      case 'General':
      default:
        // Excludes personal jewelry. Includes only if investment/excess.
        if (isJewelryInvestment) {
          zakatableWealth += goldValue + silverValue;
        }
        break;
    }
  
    // 5. Deduct Liabilities - Madhab specific
    const shortTerm = (Number(liabilities.shortTermDebt) || 0) + (Number(liabilities.billsDue) || 0);
    const longTerm = Number(liabilities.longTermDebt) || 0;
  
    let totalDeductions = 0;
  
    switch (madhab) {
      case 'Hanafi':
        // Deduct ALL debts (short + long)
        totalDeductions = shortTerm + longTerm;
        break;
      case 'Maliki':
      case 'Shafi\'i':
      case 'Hanbali':
      case 'General':
      default:
        // Deduct ONLY short-term / immediate debts
        totalDeductions = shortTerm;
        break;
    }
  
    zakatableWealth -= totalDeductions;
  
    // Floor to 0 if negative
    if (zakatableWealth < 0) {
      zakatableWealth = 0;
    }
  
    // 6. Calculate Zakat
    const eligible = zakatableWealth >= nisabThreshold;
    const zakatDue = eligible ? zakatableWealth * 0.025 : 0;
  
    return {
      madhab,
      zakatableWealth,
      nisabThreshold,
      eligible,
      zakatDue,
      totalAssets: zakatableWealth + totalDeductions, // Gross before deductions
      totalDeductions
    };
  };
