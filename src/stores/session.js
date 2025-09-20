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
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ apiToken: storedToken })
        });

        const data = await res.json(); // ✅ read the body only once

        if (res.ok) {
          // Successful session
          isLoggedIn.set(true);
          username.set(data.username);
          if (data.banned) isBanned.set(true);
          console.log('Session data:', data);
        } else {
          // Session invalid or expired
          localStorage.removeItem('sessionToken');
          sessionToken.set('');
          isLoggedIn.set(false);
          isBanned.set(false);
          alert(data.error || 'Session invalid, please log in again.');
        }
      } catch (err) {
        console.error('Session fetch failed:', err);
        localStorage.removeItem('sessionToken');
        sessionToken.set('');
        isLoggedIn.set(false);
        isBanned.set(false);
        alert('Failed to verify session. Please try again later.');
      }
    })();
  }
}
