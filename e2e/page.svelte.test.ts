import { describe, test, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@testing-library/svelte';
import Page from '../src/routes/+page.svelte';

describe('/+page.svelte', () => {
	test('renders ProjectList component', () => {
		render(Page);
		// ProjectList renders a heading "Projects" (assumed, adjust if needed)
		expect(screen.getByText(/Projects/i)).toBeInTheDocument();
	});

	test('renders Hero when not logged in', () => {
		render(Page);
		// Hero component likely has a unique text, adjust as needed
		expect(screen.getByText(/Scratch 3 and TurboWarp/i)).toBeInTheDocument();
	});
});
