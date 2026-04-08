function buildUnsubscribeUrl(baseUrl, email) {
	const token = btoa(email);
	return `${baseUrl}/unsubscribe?token=${encodeURIComponent(token)}`;
}

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		const baseUrl = url.origin;

		// Unsubscribe endpoint
		if (url.pathname === '/unsubscribe') {
			return handleUnsubscribe(request, env, url);
		}

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
			const unsubscribeUrl = buildUnsubscribeUrl(baseUrl, email);

			// Welcome email via Resend template
			await fetch('https://api.resend.com/emails', {
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${env.RESEND_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					from: 'Maciej from hora <hello@horacal.app>',
					to: [email],
					subject: "You're on the hora Calendar waitlist",
					template_id: env.RESEND_WELCOME_TEMPLATE_ID,
					data: {
						unsubscribe_url: unsubscribeUrl,
					},
					headers: {
						'List-Unsubscribe': `<${unsubscribeUrl}>`,
						'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
					},
				}),
			});

			// GA4 Measurement Protocol
			await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${env.GA_MEASUREMENT_ID}&api_secret=${env.GA_API_SECRET}`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					client_id: email,
					events: [{
						name: 'waitlist_success',
						params: {
							method: 'server_side',
						}
					}]
				}),
			});

			return new Response(JSON.stringify({ success: true }), { headers: cors });
		}

		const error = await res.text();
		return new Response(JSON.stringify({ error }), { status: res.status, headers: cors });
	},
};

async function handleUnsubscribe(request, env, url) {
	const token = url.searchParams.get('token');
	if (!token) {
		return new Response('Missing token', { status: 400 });
	}

	let email;
	try {
		email = atob(token);
	} catch {
		return new Response('Invalid token', { status: 400 });
	}

	// POST = one-click unsubscribe (RFC 8058), GET = show confirmation page
	if (request.method === 'POST' || request.method === 'GET') {
		const res = await fetch(
			`https://api.resend.com/audiences/${env.RESEND_AUDIENCE_ID}/contacts/${encodeURIComponent(email)}`,
			{
				method: 'DELETE',
				headers: {
					'Authorization': `Bearer ${env.RESEND_API_KEY}`,
				},
			}
		);

		if (res.ok || res.status === 404) {
			return new Response(unsubscribeConfirmationPage(), {
				headers: { 'Content-Type': 'text/html; charset=utf-8' },
			});
		}

		return new Response('Something went wrong. Please try again.', { status: 500 });
	}

	return new Response('Method not allowed', { status: 405 });
}

function unsubscribeConfirmationPage() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Unsubscribed — hora Calendar</title>
	<style>
		body {
			font-family: 'Geist', -apple-system, BlinkMacSystemFont, sans-serif;
			background: #0a0a0a;
			color: #e5e5e5;
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 100vh;
			margin: 0;
		}
		.card {
			text-align: center;
			max-width: 400px;
			padding: 2rem;
		}
		h1 { font-size: 1.5rem; margin-bottom: 0.5rem; }
		p { color: #a3a3a3; line-height: 1.6; }
		a { color: #f97316; text-decoration: none; }
		a:hover { text-decoration: underline; }
	</style>
</head>
<body>
	<div class="card">
		<h1>You've been unsubscribed</h1>
		<p>You won't receive any more emails from hora Calendar. If this was a mistake, you can sign up again at <a href="https://horacal.app">horacal.app</a>.</p>
	</div>
</body>
</html>`;
}
