import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../../store/useZakatStore';
import { Wallet } from 'lucide-react';

export default function CashAssets() {
  const navigate = useNavigate();
  const { cash, updateCash } = useZakatStore();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/assets/gold-silver');
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Wallet className="text-primary-color" />
        <h2>Cash & Savings</h2>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: '20%' }}></div>
      </div>
      
      <form onSubmit={handleNext}>
        <div className="form-group">
          <label className="form-label">Cash on Hand</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={cash.cashOnHand || ''}
            onChange={(e) => updateCash({ cashOnHand: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Bank Balance</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={cash.bankBalance || ''}
            onChange={(e) => updateCash({ bankBalance: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Savings</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={cash.savings || ''}
            onChange={(e) => updateCash({ savings: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/madhab')}>
            Back
          </button>
          <button type="submit" className="btn btn-primary" style={{ width: '48%' }}>
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
