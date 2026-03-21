import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import MadhabSelection from './views/MadhabSelection';
import CashAssets from './views/assets/CashAssets';
import GoldSilverAssets from './views/assets/GoldSilverAssets';
import BusinessAssets from './views/assets/BusinessAssets';
import InvestmentAssets from './views/assets/InvestmentAssets';
import Liabilities from './views/Liabilities';
import Review from './views/Review';
import Results from './views/Results';

function App() {
  return (
    <BrowserRouter>
      <div className="container animate-fade-in">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/madhab" element={<MadhabSelection />} />
          <Route path="/assets/cash" element={<CashAssets />} />
          <Route path="/assets/gold-silver" element={<GoldSilverAssets />} />
          <Route path="/assets/business" element={<BusinessAssets />} />
          <Route path="/assets/investments" element={<InvestmentAssets />} />
          <Route path="/liabilities" element={<Liabilities />} />
          <Route path="/review" element={<Review />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
