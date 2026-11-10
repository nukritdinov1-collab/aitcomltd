export default {
  async fetch(request, env) {
    // Faqat /api/ai manziliga kelgan so'rovlarni qabul qilamiz
    const url = new URL(request.url);
    if (url.pathname === '/api/ai' && request.method === 'POST') {
      try {
        const { prompt } = await request.json();
        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [{ role: 'user', content: prompt }]
        });
        return new Response(JSON.stringify({ answer: response.response }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response('Xatolik', { status: 500 });
      }
    }
    return new Response('Salom! Bu mening AI loyiham.', { status: 200 });
  }
};
