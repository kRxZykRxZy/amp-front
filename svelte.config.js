import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import adapter from '@sveltejs/adapter-netlify';
import imageSizes from 'vite-plugin-image-sizes';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const path_to_layout = join(__dirname, './src/mdsvex.svelte');

const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({layout: path_to_layout}),
		imageSizes({
			addLazyLoading: true,
		})
	],
	kit: {
		adapter: adapter({split: true}),
		alias: {
			$lib: 'src/lib',
			$components: 'src/components',
			$stores: 'src/stores'
		}
	},
	extensions: ['.svelte', '.svx']
};

export default config;
