import './SegmentBuilder.css';
import React, { useState } from 'react';
import axios from 'axios';

const SegmentBuilder = () => {
  const [segmentName, setSegmentName] = useState('');
  const [rules, setRules] = useState([
    { field: 'total_spent', operator: '>', value: '' }
  ]);
  const [logic, setLogic] = useState('AND');
  const [audienceSize, setAudienceSize] = useState(null);
  const [intent, setIntent] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const addRule = () => {
    setRules([...rules, { field: 'total_spent', operator: '>', value: '' }]);
  };

  const updateRule = (index, key, value) => {
    const updatedRules = [...rules];
    updatedRules[index][key] = value;
    setRules(updatedRules);
  };

  const previewAudience = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/segments/preview', {
        rules,
        logic
      });
      setAudienceSize(res.data.count);
    } catch (err) {
      console.error(err);
      setAudienceSize('Error');
    }
  };

  const saveSegment = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/segments/save', {
        name: segmentName,
        rules,
        logic
      });
      alert('Segment saved!');
    } catch (err) {
      console.error('Save error:', err.response?.data || err.message);
      alert('Failed to save segment: ' + (err.response?.data?.error || err.message));
    }
  };

  const generateAIMessages = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/ai/messages', {
        intent
      });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      console.error('AI Error:', err.response?.data || err.message);
      const message =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        'Unknown error';
      alert('Failed to generate suggestions: ' + message);
    }
  };

  return (
    <div className="segment-wrapper">

      <div className="segment-builder">
        <h2>Create Segment</h2>

        <input
          type="text"
          placeholder="Segment name"
          value={segmentName}
          onChange={(e) => setSegmentName(e.target.value)}
        />

        {rules.map((rule, index) => (
          <div className="rule-group" key={index}>
            <select value={rule.field} onChange={e => updateRule(index, 'field', e.target.value)}>
              <option value="total_spent">Total Spent</option>
              <option value="visits">Visits</option>
              <option value="last_order_date">Last Order Date</option>
            </select>
            <select value={rule.operator} onChange={e => updateRule(index, 'operator', e.target.value)}>
              <option value=">">&gt;</option>
              <option value="<">&lt;</option>
              <option value="=">=</option>
            </select>
            <input
              type="text"
              value={rule.value}
              onChange={e => updateRule(index, 'value', e.target.value)}
            />
          </div>
        ))}

        <div>
          Logic:
          <select value={logic} onChange={e => setLogic(e.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
        </div>

        <button onClick={addRule}>+ Add Rule</button>
        <button onClick={previewAudience}>Preview Audience</button>
        <button onClick={saveSegment}>Save Segment</button>

        {audienceSize !== null && (
          <p className="audience-count">Audience Size: {audienceSize}</p>
        )}
      </div>

      <div className="segment-builder">
        <h2>Generate Campaign Messages</h2>

        <input
          type="text"
          placeholder="Campaign goal / intent"
          value={intent}
          onChange={(e) => setIntent(e.target.value)}
        />

        <button onClick={generateAIMessages}>Generate AI Message Suggestions</button>

        {suggestions.length > 0 && (
          <div className="suggestions">
            <h4>Suggested Messages:</h4>
            <ul>
              {suggestions.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

    </div>
  );
};

export default SegmentBuilder;
