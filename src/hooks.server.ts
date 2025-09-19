import type { Handle } from '@sveltejs/kit';

export const load = () => {
    return {
        theme: localStorage.getItem('theme') || 'light'
    };
};

