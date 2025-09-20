import { writable } from 'svelte/store';

// Client-only stores
export const isLoggedIn = writable(false);
export const isBanned = writable(false);
export const sessionToken = writable('');
export const username = writable('');

// Initialize session on the client
if (typeof window !== 'undefined') {
  const storedToken = localStorage.getItem('sessionToken');
  if (storedToken) {
    sessionToken.set(storedToken);

    (async () => {
      try {
        const res = await fetch('https://ampmod-api.onrender.com/session', {
          credentials: 'include'
        });

        if (res.ok) {
          const data = await res.json();
          isLoggedIn.set(true);
          username.set(data.username);
          console.log(data);
        } else {
          localStorage.removeItem('sessionToken');
          sessionToken.set('');
        }
      } catch (err) {
        console.error('Session fetch failed:', err);
        localStorage.removeItem('sessionToken');
        sessionToken.set('');
      }
    })();
  }
}
