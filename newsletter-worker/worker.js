export default {
	async fetch(request, env) {
		if (request.method === 'OPTIONS') {
			return new Response(null, {
				headers: {
					'Access-Control-Allow-Origin': 'https://horacal.app',
					'Access-Control-Allow-Methods': 'POST',
					'Access-Control-Allow-Headers': 'Content-Type',
					'Access-Control-Max-Age': '86400',
				},
			});
		}

		if (request.method !== 'POST') {
			return new Response('Method not allowed', { status: 405 });
		}

		const { email } = await request.json();

		if (!email || !email.includes('@')) {
			return new Response(JSON.stringify({ error: 'Invalid email' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			});
		}

		const res = await fetch(`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts`, {
			method: 'POST',
			headers: {
				'Authorization': `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email }),
		});

		const cors = {
			'Access-Control-Allow-Origin': 'https://horacal.app',
			'Content-Type': 'application/json',
		};

		if (res.ok) {
			return new Response(JSON.stringify({ success: true }), { headers: cors });
		}

		const error = await res.text();
		return new Response(JSON.stringify({ error }), { status: res.status, headers: cors });
	},
};
