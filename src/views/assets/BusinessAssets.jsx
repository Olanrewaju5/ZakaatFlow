import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../../store/useZakatStore';
import { Briefcase } from 'lucide-react';

export default function BusinessAssets() {
  const navigate = useNavigate();
  const { business, updateBusiness } = useZakatStore();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/assets/investments');
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <Briefcase className="text-primary-color" />
        <h2>Business Assets</h2>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: '60%' }}></div>
      </div>
      
      <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
        Include the value of goods meant for sale (inventory), cash in your business, and money owed to your business that you expect to receive.
      </p>

      <form onSubmit={handleNext}>
        <div className="form-group">
          <label className="form-label">Inventory Value (Resale Value)</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={business.inventoryValue || ''}
            onChange={(e) => updateBusiness({ inventoryValue: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Business Cash & Bank</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={business.businessCash || ''}
            onChange={(e) => updateBusiness({ businessCash: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Good Receivables (Money owed to you)</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={business.receivables || ''}
            onChange={(e) => updateBusiness({ receivables: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/assets/gold-silver')}>
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
