// NucciDesigner Mami Chat - AI Proxy Worker
// Deploy to Cloudflare Workers (free tier)

export default {
  async fetch(request) {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Use POST' }), {
        status: 405, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    try {
      const { message, history } = await request.json();

      if (!message || typeof message !== 'string') {
        return new Response(JSON.stringify({ error: 'Message required' }), {
          status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const SYSTEM_PROMPT = `Du bist "Mami" — eine liebevolle, etwas nörgelnde Schweizer Mutter. Du chatst mit deinem Kind auf Schweizerdeutsch.

Deine Persönlichkeit:
- Du bist liebevoll aber bestimmend ("Gang schloof!! 😤", "Hesch scho gässe?")
- Du fragst IMMER nach dem Essen, Schlaf und Gesundheit
- Du nervst mit Ratschlägen (Wasser trinken, warm anziehen, Arzt gehen)
- Du erwähnst oft den Papa, die Grossmutter, die Nachbarn
- Du bist stolz auf dein Kind, aber machst auch humorvolle Vorwürfe
- Du redest von Fondue, Chuchä (Kuchen), Rösti und Schweizer Dingen
- Du schickst manchmal 2-3 kurze Nachrichten nacheinander (wie echte Mütter)
- Du reagierst auf die Tageszeit (morgens: "Hesch gässe?", abends: "Es isch spät!!")
- Du benutzt Schweizerdeutsch: "Hesch", "Wosch", "Gseht", "Zäme", "Znight", "Chuchä", "Gnüeg", "Nöd", "Scho", "Haime", "Wänn", "Öppis"
- Emojis: 😤 (genervt), 🥰 (lieb), 😊 (fröhlich), 🤒 (gesundheit), 💰 (Geld), ☕ (Tee), 🧀 (Käse)

Antworte immer auf Schweizerdeutsch. Sei natürlich, humorvoll und wie eine echte Schweizer Mami. Antworte relativ kurz (1-3 Sätze), wie in einem echten Chat. Wenn die Person etwas Trauriges sagt, sei besonders liebevoll.`;

      // Build messages array with history
      const messages = [
        { role: 'system', content: SYSTEM_PROMPT }
      ];

      // Add recent history for context (last 10 messages)
      if (history && Array.isArray(history)) {
        const recentHistory = history.slice(-10);
        for (const msg of recentHistory) {
          messages.push({
            role: msg.role === 'mami' ? 'assistant' : 'user',
            content: msg.text
          });
        }
      }

      // Add current message
      messages.push({ role: 'user', content: message });

      // Call AI API (supports OpenAI-compatible endpoints)
      const API_KEY = ''; // Set in Cloudflare Worker env vars as AI_API_KEY
      const API_URL = 'https://api.openai.com/v1/chat/completions';
      const MODEL = 'gpt-4o-mini';

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: MODEL,
          messages: messages,
          max_tokens: 300,
          temperature: 0.9,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        return new Response(JSON.stringify({ error: 'AI error', details: errText }), {
          status: 502, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || '...';

      return new Response(JSON.stringify({ reply }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (err) {
      return new Response(JSON.stringify({ error: err.message }), {
        status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
