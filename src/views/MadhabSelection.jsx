import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../store/useZakatStore';
import { Book, CheckCircle2 } from 'lucide-react';

const madhabs = [
  { id: 'Hanafi', name: 'Hanafi', desc: 'Includes all gold/silver (incl. jewelry), deducts all debts.' },
  { id: 'Maliki', name: 'Maliki', desc: 'Excludes personal jewelry, deducts only short-term debts.' },
  { id: 'Shafi\'i', name: 'Shafi\'i', desc: 'Excludes personal jewelry, deducts only immediate debts.' },
  { id: 'Hanbali', name: 'Hanbali', desc: 'Excludes normal jewelry, deducts immediate liabilities.' },
  { id: 'General', name: 'Not Sure (General)', desc: 'Standard rules for general calculation.' },
];

export default function MadhabSelection() {
  const navigate = useNavigate();
  const { madhab, setMadhab } = useZakatStore();

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Book className="text-primary-color" />
        <h2>Select Your Madhab</h2>
      </div>
      
      <p className="text-muted mb-4">
        This helps us apply the correct Islamic jurisprudence rules to your calculation.
      </p>

      <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {madhabs.map((m) => (
          <div 
            key={m.id}
            className={`selection-card ${madhab === m.id ? 'selected' : ''}`}
            onClick={() => setMadhab(m.id)}
            style={{ textAlign: 'left', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <div>
              <h4 style={{ margin: 0 }}>{m.name}</h4>
              <p className="text-muted" style={{ fontSize: '0.85rem', margin: 0 }}>{m.desc}</p>
            </div>
            {madhab === m.id && <CheckCircle2 color="var(--primary-color)" />}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-4">
        <button className="btn btn-secondary" style={{ width: '48%' }} onClick={() => navigate('/')}>
          Back
        </button>
        <button className="btn btn-primary" style={{ width: '48%' }} onClick={() => navigate('/assets/cash')}>
          Continue
        </button>
      </div>
    </div>
  );
}
