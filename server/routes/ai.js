const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/messages', async (req, res) => {
  const { intent } = req.body;

  if (!intent) {
    return res.status(400).json({ error: 'Missing campaign intent in request body' });
  }

  console.log("⚡ Generating AI messages for intent:", intent);

  try {
    const geminiRes = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: `Generate 3 short, friendly marketing messages for this campaign goal: "${intent}". 
Each message should also include a creative product or offer image idea.
Respond in this format (line by line):

- Message: [Your message]
  Image: [Your image idea]`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const rawText = geminiRes.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Parse messages and image suggestions
    const lines = rawText.split('\n').map(line => line.trim());
    const suggestions = [];

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('- Message:')) {
        const message = lines[i].replace('- Message:', '').trim();
        const image = lines[i + 1]?.replace('Image:', '').trim();
        if (message && image) {
          suggestions.push(`${message}\n📸 Image Idea: ${image}`);
        }
      }
    }

    if (suggestions.length === 0) {
      return res.status(500).json({ error: 'No suggestions returned by Gemini' });
    }

    res.json({ suggestions });
  } catch (err) {
    console.error('❌ Gemini API error:', err.response?.data || err.message || err);
    res.status(500).json({
      error: 'Failed to generate messages',
      details: err.response?.data || err.message
    });
  }
});

module.exports = router;