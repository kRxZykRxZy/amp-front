import { writable } from 'svelte/store';

export const isLoggedIn = writable(false);
export const isBanned = writable(false);
const storedToken = localStorage.getItem('sessionToken');
export const sessionToken = writable(storedToken || '');
if (storedToken) {
    const res = await fetch('https://ampmod-api.onrender.com/session/, { credentials: 'include' });
    if (res.ok) {
        isLoggedIn.set(true);
        const data = await res.json();
        username.set(data.username);
    } else {
        localStorage.removeItem('sessionToken');
        sessionToken.set('');
    }
export const username = writable(res.ok ? (await res.json()).username : '');