import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../store/useZakatStore';
import { calculateZakat } from '../engine/zakatLogic';
import { CheckSquare } from 'lucide-react';

export default function Review() {
  const navigate = useNavigate();
  const state = useZakatStore();
  
  const handleCalculate = () => {
    const result = calculateZakat(state); // Uses the engine we built
    state.setCalculationResult(result);
    navigate('/results');
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <CheckSquare className="text-primary-color" />
        <h2>Review Your Details</h2>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: '100%' }}></div>
      </div>
      
      <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
        Please verify the information below before we calculate your Zakat using <strong>{state.madhab}</strong> rules.
      </p>

      <div className="mb-4" style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '12px' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Assets</h3>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
          <li className="flex justify-between mb-1">
            <span>Cash & Savings:</span>
            <strong>${(Number(state.cash.cashOnHand) + Number(state.cash.bankBalance) + Number(state.cash.savings)).toFixed(2)}</strong>
          </li>
          <li className="flex justify-between mb-1">
            <span>Gold & Silver:</span>
            <strong>${(Number(state.goldSilver.goldValue) + Number(state.goldSilver.silverValue)).toFixed(2)}</strong>
          </li>
          <li className="flex justify-between mb-1">
            <span>Business Assets:</span>
            <strong>${(Number(state.business.inventoryValue) + Number(state.business.businessCash) + Number(state.business.receivables)).toFixed(2)}</strong>
          </li>
          <li className="flex justify-between mb-1">
            <span>Investments:</span>
            <strong>${(Number(state.investments.stocksValue) + Number(state.investments.cryptoValue)).toFixed(2)}</strong>
          </li>
        </ul>

        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-dark)' }}>Liabilities</h3>
        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)' }}>
          <li className="flex justify-between mb-1">
            <span>Short-Term Debts:</span>
            <strong>${(Number(state.liabilities.shortTermDebt) + Number(state.liabilities.billsDue)).toFixed(2)}</strong>
          </li>
          <li className="flex justify-between mb-1">
            <span>Long-Term Debts:</span>
            <strong>${(Number(state.liabilities.longTermDebt)).toFixed(2)}</strong>
          </li>
        </ul>
      </div>

      <div className="flex justify-between mt-4">
        <button className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/liabilities')}>
          Edit Info
        </button>
        <button className="btn btn-primary" style={{ width: '48%' }} onClick={handleCalculate}>
          Calculate
        </button>
      </div>
    </div>
  );
}
