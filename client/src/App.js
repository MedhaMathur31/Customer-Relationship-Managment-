import React, { useState } from 'react';
import AuthBar from './components/AuthBar';
import SegmentBuilder from './components/SegmentBuilder';
import CampaignHistory from './components/CampaignHistory';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="app-container">
    <h1 className="app-title">CRM Campaign Manager for Xeno</h1>
    <div className="section">
    <SegmentBuilder />
    </div>
    <div className="section">
    <CampaignHistory />
    </div>
    </div>
  );
}

export default App;
