import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../../store/useZakatStore';
import { TrendingUp } from 'lucide-react';

export default function InvestmentAssets() {
  const navigate = useNavigate();
  const { investments, updateInvestments } = useZakatStore();

  const handleNext = (e) => {
    e.preventDefault();
    navigate('/liabilities');
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-2">
        <TrendingUp className="text-primary-color" />
        <h2>Investments</h2>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: '80%' }}></div>
      </div>
      
      <p className="text-muted mb-4" style={{ fontSize: '0.9rem' }}>
        Include shares, stocks, crypto, and other investments. Usually, if bought to hold for dividends, only the profit is Zakatable. If bought to trade/sell, the full market value is Zakatable.
      </p>

      <form onSubmit={handleNext}>
        <div className="form-group">
          <label className="form-label">Total Value of Stocks/Shares</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={investments.stocksValue || ''}
            onChange={(e) => updateInvestments({ stocksValue: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Total Value of Crypto (USDT, BTC, etc.)</label>
          <input 
            type="number" 
            min="0"
            className="form-input" 
            placeholder="0.00"
            value={investments.cryptoValue || ''}
            onChange={(e) => updateInvestments({ cryptoValue: parseFloat(e.target.value) || 0 })}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Primary Intent for these Investments</label>
          <select 
            className="form-input"
            value={investments.investmentIntent}
            onChange={(e) => updateInvestments({ investmentIntent: e.target.value })}
          >
            <option value="long_term">Long-term Dividend Hold (Only profit/dividends may be taxed)</option>
            <option value="trading">Active Trading / Intention to sell</option>
          </select>
        </div>

        <div className="flex justify-between mt-4">
          <button type="button" className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/assets/business')}>
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
