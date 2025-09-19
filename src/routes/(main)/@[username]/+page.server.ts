// src/routes/[username]/+page.server.ts
import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';

const AMPMOD_WEB_BACK_URL = import.meta.env.VITE_AMPMOD_WEB_BACK_URL;

export const load: PageServerLoad = async ({ params, url, fetch }) => { // params is correctly destructured here
    const fetchUsername = params.username; // This is where the value comes from initially
    const useFakeData = url.searchParams.has('fakedata');
    const isDevelopment = import.meta.env.DEV;

    let userData = null;
    let errorMessage: string | null = null;

    try {
        let response;
        try {
            response = await fetch(`https://ampmod-api.onrender.com/users/${fetchUsername}`);
            if (!response.ok) {
                if (response.status === 404) {
                    error(404, `User "${fetchUsername}" not found.`);
                }
                error(response.status, 'Failed to fetch user data');
            }
            userData = await response.json();
        } catch (fetchErr: any) {
            if (isDevelopment && useFakeData) {
                console.warn(`[SSR] Network error fetching user data for ${fetchUsername}. Using fake data due to ?fakedata param.`, fetchErr);
                userData = {
                    name: fetchUsername,
                    image: 'https://via.placeholder.com/128/ADD8E6/000000?text=FakeUser',
                    bio: 'I make cool projects *that don\'t exist*, and I follow users *that are robots*.',
                    joindate: Math.floor(Date.now() / 1000) - (Math.random() * 31536000 * 2),
                    rank: 0,
                    linked_accounts: {
                        scratch: 'griffpatch',
                        github: 'github',
                        codeberg: 'Codeberg',
                        wiki: 'MediaWiki default',
                        forums: 'admin'
                    },
                    is_following: Math.random() > 0.5
                };
            } else {
                errorMessage = `Could not load user page. ${fetchErr.message || fetchErr}`;
                console.error(`[SSR Error]`, fetchErr);
            }
        }
    } catch (err: any) {
        throw err;
    }

    return {
        userData,
        error: errorMessage,
        params // Explicitly return params so it's guaranteed to be in data.params
    };
};