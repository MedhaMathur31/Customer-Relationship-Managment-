import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CampaignHistory.css';

const CampaignHistory = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://customer-relationship-managment.onrender.com/api/segments/history');
        setCampaigns(res.data);
      } catch (err) {
        console.error('Error fetching campaign history:', err);
        setError('Failed to load campaign history');
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="campaign-history">
      <h2>Campaign History</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && campaigns.length === 0 && <p>No campaigns yet.</p>}

      {campaigns.map((campaign) => (
        <div key={campaign.id} className="campaign-card">
          <h3>{campaign.name}</h3>
          <p><strong>Created At:</strong> {new Date(campaign.createdAt).toLocaleString()}</p>
          <p><strong>Audience Size:</strong> {campaign.audienceSize}</p>
          <p><strong>Sent:</strong> {campaign.sent}</p>
          <p><strong>Failed:</strong> {campaign.failed}</p>
        </div>
      ))}
    </div>
  );
};

export default CampaignHistory;