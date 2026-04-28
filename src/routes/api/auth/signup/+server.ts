import { users } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const { username, password } = await request.json();
	if (!username || !password) {
		return new Response('Invalid', { status: 400 });
	}
	if (users.has(username)) {
		return new Response('User exists', { status: 400 });
	}
	users.set(username, password);
	return new Response('ok');
};
