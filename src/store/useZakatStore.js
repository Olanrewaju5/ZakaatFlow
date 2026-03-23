import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialZakatState = {
  madhab: 'General', // 'Hanafi', 'Maliki', 'Shafi\'i', 'Hanbali', 'General'
  
  cash: {
    cashOnHand: 0,
    bankBalance: 0,
    savings: 0,
  },
  
  goldSilver: {
    goldValue: 0,
    silverValue: 0, 
    jewelryUsageType: 'personal_use', // 'personal_use' | 'investment'
  },
  
  business: {
    inventoryValue: 0,
    businessCash: 0,
    receivables: 0,
  },
  
  investments: {
    stocksValue: 0,
    cryptoValue: 0,
    investmentIntent: 'long_term', // 'trading' | 'long_term'
  },
  
  liabilities: {
    shortTermDebt: 0, // Due immediately or within the year
    longTermDebt: 0,  // Mortgage, etc.
    billsDue: 0,
  },
  
  // Results
  calculationResult: null
};

export const useZakatStore = create(
  persist(
    (set) => ({
      ...initialZakatState,

      setMadhab: (madhab) => set({ madhab }),
      
      updateCash: (updates) => set((state) => ({ cash: { ...state.cash, ...updates } })),
      
      updateGoldSilver: (updates) => set((state) => ({ goldSilver: { ...state.goldSilver, ...updates } })),
      
      updateBusiness: (updates) => set((state) => ({ business: { ...state.business, ...updates } })),
      
      updateInvestments: (updates) => set((state) => ({ investments: { ...state.investments, ...updates } })),
      
      updateLiabilities: (updates) => set((state) => ({ liabilities: { ...state.liabilities, ...updates } })),
      
      setCalculationResult: (result) => set({ calculationResult: result }),
      
      reset: () => set({ ...initialZakatState })
    }),
    {
      name: 'zakat-calculator-storage', // unique name
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
