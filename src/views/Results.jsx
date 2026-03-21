import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useZakatStore } from '../store/useZakatStore';
import { Share2, Download, RotateCcw } from 'lucide-react';
import { jsPDF } from 'jspdf';

export default function Results() {
  const navigate = useNavigate();
  const { madhab, calculationResult, reset } = useZakatStore();

  if (!calculationResult) {
    navigate('/');
    return null;
  }

  const handleStartOver = () => {
    reset();
    navigate('/');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ZakaatFlow Statement", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Madhab Applied: ${madhab}`, 20, 35);
    doc.text(`Total Zakatable Assets: $${calculationResult.totalAssets.toFixed(2)}`, 20, 45);
    doc.text(`Total Deductions: $${calculationResult.totalDeductions.toFixed(2)}`, 20, 55);
    doc.text(`Net Zakatable Wealth: $${calculationResult.zakatableWealth.toFixed(2)}`, 20, 65);
    doc.text(`Nisab Threshold: $${calculationResult.nisabThreshold.toFixed(2)}`, 20, 75);
    
    doc.line(20, 85, 190, 85);

    doc.setFont("helvetica", "bold");
    let resultMsg = calculationResult.eligible 
      ? `Total Zakat Due: $${calculationResult.zakatDue.toFixed(2)}` 
      : "You do not meet the Nisab requirement. No Zakat due.";
    doc.text(resultMsg, 20, 100);

    doc.save("Zakat_Calculation.pdf");
  };

  const handleShareWhatsApp = () => {
    const text = `My Zakat Calculation via ZakaatFlow:\nMadhab: ${madhab}\nNet Zakatable Wealth: $${calculationResult.zakatableWealth.toFixed(2)}\nZakat Due: $${calculationResult.zakatDue.toFixed(2)}\nCalculate yours easily today!`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="card animate-fade-in" style={{ textAlign: 'center' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>Your Zakat Calculation</h2>
      <p className="text-muted mb-4">Calculated securely offline using <strong>{madhab}</strong> rules.</p>
      
      <div 
        style={{ 
          padding: '2.5rem', 
          backgroundColor: calculationResult.eligible ? 'var(--primary-color)' : '#f3f4f6', 
          color: calculationResult.eligible ? 'white' : 'var(--text-dark)', 
          borderRadius: '16px', 
          marginBottom: '2rem',
          boxShadow: calculationResult.eligible ? '0 10px 25px rgba(11, 74, 63, 0.3)' : 'none'
        }}
      >
        <p style={{ fontSize: '1.2rem', marginBottom: '0.5rem', opacity: 0.9 }}>Total Zakat Due</p>
        <h1 style={{ fontSize: '3rem', margin: 0, color: calculationResult.eligible ? '#ffffff' : 'inherit' }}>
          ${calculationResult.zakatDue.toFixed(2)}
        </h1>
        {!calculationResult.eligible && (
          <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>
            Your Zakatable wealth is below the Nisab threshold.
          </p>
        )}
      </div>

      <div style={{ textAlign: 'left', marginBottom: '2rem' }}>
        <h4 style={{ marginBottom: '1rem' }}>Summary Breakdown</h4>
        <div className="flex justify-between mb-2">
          <span className="text-muted">Net Zakatable Wealth</span>
          <strong>${calculationResult.zakatableWealth.toFixed(2)}</strong>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted">Total Deductions</span>
          <strong style={{ color: 'var(--error-color)' }}>-${calculationResult.totalDeductions.toFixed(2)}</strong>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-muted">Nisab Threshold</span>
          <strong>${calculationResult.nisabThreshold.toFixed(2)}</strong>
        </div>
      </div>

      <div className="flex gap-2 mb-4" style={{ flexDirection: 'column' }}>
        <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }} onClick={handleDownloadPDF}>
          <Download size={20} /> Download PDF
        </button>
        <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', backgroundColor: 'var(--primary-light)', color: 'white', border: 'none' }} onClick={handleShareWhatsApp}>
          <Share2 size={20} /> Share via WhatsApp
        </button>
      </div>
      
      <button className="btn btn-secondary" style={{ display: 'flex', gap: '0.5rem', margin: '0 auto', maxWidth: '200px' }} onClick={handleStartOver}>
        <RotateCcw size={20} /> Start Over
      </button>
    </div>
  );
}
