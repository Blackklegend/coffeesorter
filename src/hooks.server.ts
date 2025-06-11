import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
  const user = event.cookies.get('session');
  if (user) {
    event.locals.user = user;
  }
  return resolve(event);
};
