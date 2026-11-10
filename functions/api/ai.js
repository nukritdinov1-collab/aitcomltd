export async function onRequestPost(context) {
  try {
    // Foydalanuvchi yozgan xabarni olamiz
    const { prompt } = await context.request.json();

    // Cloudflare'ning AI modeliga (Llama 3) yuboramiz
    const response = await context.env.AI.run('@cf/meta/llama-3-8b-instruct', {
      messages: [
        { role: 'system', content: 'Siz foydali va aqlli yordamchisiz.' },
        { role: 'user', content: prompt }
      ]
    });

    // Javobni qaytaramiz
    return new Response(JSON.stringify({ answer: response.response }), {
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'Xatolik yuz berdi' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
