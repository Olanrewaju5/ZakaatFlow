import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="card text-center" style={{ margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <div style={{ backgroundColor: 'var(--primary-light)', padding: '1.5rem', borderRadius: '50%', color: 'white' }}>
          <Calculator size={48} />
        </div>
      </div>
      
      <h1>ZakaatFlow</h1>
      <p className="text-muted mb-4">
        Calculate your Zakat accurately, transparently, and effortlessly in under 2 minutes. Madhab-aware and secure.
      </p>

      <button className="btn btn-primary" onClick={() => navigate('/madhab')}>
        Start Calculation
      </button>

      <p className="text-muted mt-4" style={{ fontSize: '0.875rem' }}>
        No internet? No problem. Works entirely offline!
      </p>
    </div>
  );
}
