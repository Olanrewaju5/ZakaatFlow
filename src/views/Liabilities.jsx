import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../store/useZakatStore';
import { Receipt } from 'lucide-react';

export default function Liabilities() {
  const navigate = useNavigate();
  const { madhab, liabilities, updateLiabilities } = useZakatStore();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/review');
  };

  const isHanafi = madhab === 'Hanafi';

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Receipt className="text-primary-color" />
        <h2>Liabilities & Debts</h2>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: '90%' }}></div>
      </div>
      
      {!isHanafi && (
        <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#374151', fontSize: '0.9rem', border: '1px solid #e5e7eb' }}>
          <strong>Note:</strong> Under {madhab} rules, typically only short-term/immediate debts are deducted from your Zakatable wealth.
        </div>
      )}

      {isHanafi && (
        <div style={{ backgroundColor: '#e5e7eb', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#111827', fontSize: '0.9rem', border: '1px solid #d1d5db' }}>
          <strong>Note:</strong> Under Hanafi rules, all debts (short-term and long-term) can be deducted from your Zakatable wealth.
        </div>
      )}

      <form onSubmit={handleNext}>
        <div className="form-group">
          <label className="form-label">Short-Term Debts (Due soon)</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={liabilities.shortTermDebt || ''}
            onChange={(e) => updateLiabilities({ shortTermDebt: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Immediate Bills & Expenses</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={liabilities.billsDue || ''}
            onChange={(e) => updateLiabilities({ billsDue: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Long-Term Debts (e.g. Mortgages)</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={liabilities.longTermDebt || ''}
            onChange={(e) => updateLiabilities({ longTermDebt: parseFloat(e.target.value) || 0 })}
          />
          {!isHanafi && <small className="text-muted" style={{ display: 'block', marginTop: '0.5rem' }}>This might be ignored in the calculation based on your Madhab.</small>}
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/assets/investments')}>
            Back
          </button>
          <button type="submit" className="btn btn-primary" style={{ width: '48%' }}>
            Review
          </button>
        </div>
      </form>
    </div>
  );
}
