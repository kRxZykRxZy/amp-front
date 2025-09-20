import { svelteTesting } from '@testing-library/svelte/vite'; import { sveltekit } from '@sveltejs/kit/vite'; import { defineConfig, loadEnv } from 'vite'; import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({ mode }) => { const env = loadEnv(mode, process.cwd(), ''); return {
  plugins: [tailwindcss(), sveltekit()],
  server: { host: '0.0.0.0', port: parseInt(process.env.PORT) || 5173 },
  preview: { host: '0.0.0.0', port: parseInt(process.env.PORT) || 5173 },
  define: { 'import.meta.env.AMPMOD_WEB_BACK_URL': JSON.stringify(env.AMPMOD_WEB_BACK_URL || 'http://localhost:4333') },
  test: { workspace: [
    { extends: './vite.config.ts', plugins: [svelteTesting()], test: { name: 'client', environment: 'jsdom', clearMocks: true, include: ['src/**/*.svelte.{test,spec}.{js,ts}'], exclude: ['src/lib/server/**'], setupFiles: ['./vitest-setup-client.ts'] } },
    { extends: './vite.config.ts', test: { name: 'server', environment: 'node', include: ['src/**/*.{test,spec}.{js,ts}'], exclude: ['src/**/*.svelte.{test,spec}.{js,ts}'] } }
] }
}}); 
