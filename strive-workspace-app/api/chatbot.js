// Vercel Serverless Function for Claude AI Chatbot
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, systemPrompt, temperature = 0.85, maxTokens = 300 } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
    if (!CLAUDE_API_KEY) {
      console.error('❌ CLAUDE_API_KEY not found in environment');
      return res.status(500).json({ error: 'Claude API not configured' });
    }

    console.log('🤖 Proxying request to Claude API...');

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: maxTokens,
        temperature: temperature,
        system: systemPrompt || 'You are a helpful AI assistant.',
        messages: messages
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Claude API error:', response.status, errorText);
      return res.status(response.status).json({ error: 'Claude API request failed', details: errorText });
    }

    const data = await response.json();
    console.log('✅ Claude API response received');

    return res.status(200).json({
      success: true,
      response: data.content[0].text
    });
  } catch (error) {
    console.error('❌ Chatbot error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}
