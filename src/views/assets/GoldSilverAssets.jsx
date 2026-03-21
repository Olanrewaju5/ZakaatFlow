import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../../store/useZakatStore';
import { Gem } from 'lucide-react';

export default function GoldSilverAssets() {
  const navigate = useNavigate();
  const { madhab, goldSilver, updateGoldSilver } = useZakatStore();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/assets/business');
  };

  const isHanafi = madhab === 'Hanafi';

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Gem className="text-primary-color" />
        <h2>Gold & Silver</h2>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: '40%' }}></div>
      </div>
      
      {!isHanafi && (
        <div style={{ backgroundColor: '#f3f4f6', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#374151', fontSize: '0.9rem', border: '1px solid #e5e7eb' }}>
          <strong>Note:</strong> Under {madhab} jurisprudence, personal use jewelry is typically excluded from Zakat. You only need to declare gold/silver kept as an investment or beyond normal usage.
        </div>
      )}

      {isHanafi && (
        <div style={{ backgroundColor: '#e5e7eb', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', color: '#111827', fontSize: '0.9rem', border: '1px solid #d1d5db' }}>
          <strong>Note:</strong> Under Hanafi jurisprudence, all gold and silver is subject to Zakat, including personal jewelry.
        </div>
      )}

      <form onSubmit={handleNext}>
        <div className="form-group">
          <label className="form-label">Total Current Gold Value</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={goldSilver.goldValue || ''}
            onChange={(e) => updateGoldSilver({ goldValue: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Total Current Silver Value</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={goldSilver.silverValue || ''}
            onChange={(e) => updateGoldSilver({ silverValue: parseFloat(e.target.value) || 0 })}
          />
        </div>

        {!isHanafi && (
          <div className="form-group">
            <label className="form-label">Is this kept primarily for investment?</label>
            <select 
              className="form-input"
              value={goldSilver.jewelryUsageType}
              onChange={(e) => updateGoldSilver({ jewelryUsageType: e.target.value })}
            >
              <option value="personal_use">No, Personal Use Only</option>
              <option value="investment">Yes, it is an Investment</option>
            </select>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button type="button" className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/assets/cash')}>
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
