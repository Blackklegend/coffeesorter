import { users } from '$lib/server/db';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { username, password } = await request.json();
  const stored = users.get(username);
  if (!stored || stored !== password) {
    return new Response('Invalid credentials', { status: 401 });
  }
  cookies.set('session', username, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax'
  });
  return new Response('ok');
};
