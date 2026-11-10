export default {
  async fetch(request, env) {
    // Faqat /api/ai manziliga kelgan POST so'rovlarini qabul qilamiz
    const url = new URL(request.url);
    if (url.pathname === '/api/ai' && request.method === 'POST') {
      try {
        const { prompt } = await request.json();
        
        const response = await env.AI.run('@cf/meta/llama-3-8b-instruct', {
          messages: [
            { 
              role: 'system', 
              content: 'Siz aqlli va foydali sun\'iy intellektsiz. Foydalanuvchi qaysi tilda yozishidan qat\'i nazar, siz HAR DOIM faqat o\'zbek tilida javob berishingiz shart.' 
            },
            { 
              role: 'user', 
              content: prompt 
            }
          ]
        });

        return new Response(JSON.stringify({ answer: response.response }), {
          headers: { 'Content-Type': 'application/json' },
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: 'Xatolik yuz berdi' }), { 
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }
    return new Response('Salom! Bu mening AI loyiham.', { status: 200 });
  }
};
