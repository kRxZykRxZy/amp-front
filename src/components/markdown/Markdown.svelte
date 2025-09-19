<script lang="ts">
    import { marked } from 'marked';
    import { browser } from '$app/environment'; // Import browser environment flag

    // Import DOMPurify for client-side
    import DOMPurify from 'dompurify';

    // Declare a variable to hold the server-side DOMPurify instance
    let serverSidePurify: typeof DOMPurify | null = null;

    // Use a top-level async IIFE (Immediately Invoked Function Expression)
    // to handle the conditional import and setup for SSR.
    // This allows `await` to be used without making the entire script block async.
    (async () => {
        if (!browser) {
            // Only import jsdom if not in the browser (i.e., on the server)
            const { JSDOM } = await import('jsdom');
            const window = new JSDOM('').window;
            serverSidePurify = DOMPurify(window);
        }
    })();


    let { content } = $props();

    let renderedHtml: string = '';

    // Make renderMarkdown an async function because it will conditionally
    // use an awaited import's result (serverSidePurify)
    async function renderMarkdown(markdownContent: string) {
        if (markdownContent) {
            const rawHtml = marked.parse(markdownContent) as string;

            // Wait for serverSidePurify to be initialized if on server
            if (!browser && serverSidePurify === null) {
                // This scenario should ideally be handled by the IIFE above,
                // but adding a safety await here for robustness in case of race conditions
                // or if the content is set before the IIFE finishes.
                // In most SvelteKit SSR scenarios, the module-level IIFE will complete
                // before renderMarkdown is first called.
                await new Promise(resolve => {
                    const checkInterval = setInterval(() => {
                        if (serverSidePurify !== null) {
                            clearInterval(checkInterval);
                            resolve(null);
                        }
                    }, 5); // Check every 5ms
                });
            }

            if (browser) {
                // Client-side sanitization
                renderedHtml = DOMPurify.sanitize(rawHtml);
            } else if (serverSidePurify) {
                // Server-side sanitization
                renderedHtml = serverSidePurify.sanitize(rawHtml);
            } else {
                // Fallback: If for some reason serverSidePurify is still null on server,
                // return raw HTML (less secure, but prevents crash)
                console.warn('DOMPurify not initialized for SSR, rendering raw HTML.');
                renderedHtml = rawHtml;
            }
        } else {
            renderedHtml = '';
        }
    }

    // Call renderMarkdown initially. Since renderMarkdown is now async,
    // this will return a Promise, but Svelte's reactivity system
    // will handle the update once the Promise resolves.
    renderMarkdown(content);

    $effect(() => {
        renderMarkdown(content);
    });
</script>

<div class="markdown-content">
    {@html renderedHtml}
</div>

<style>
    /* Plain CSS for markdown elements */
    .markdown-content :global(h1),
    .markdown-content :global(h2),
    .markdown-content :global(h3),
    .markdown-content :global(h4),
    .markdown-content :global(h5),
    .markdown-content :global(h6) {
        font-weight: bold; /* Corresponds to font-bold */
        margin-top: 1.5rem; /* Corresponds to mt-6 (24px) */
        margin-bottom: 0.75rem; /* Corresponds to mb-3 (12px) */
    }
    .markdown-content :global(h1) { font-size: 2.25rem; /* Corresponds to text-4xl, adjusted to 3xl for better fit if 4xl was too big */ }
    .markdown-content :global(h2) { font-size: 1.875rem; /* Corresponds to text-3xl, adjusted to 2xl */ }
    .markdown-content :global(h3) { font-size: 1.5rem; /* Corresponds to text-2xl, adjusted to xl */ }

    .markdown-content :global(p) {
        margin-bottom: 1rem; /* Corresponds to mb-4 */
        line-height: 1.625; /* Corresponds to leading-relaxed */
    }

    .markdown-content :global(ul),
    .markdown-content :global(ol) {
        list-style-type: disc; /* Corresponds to list-disc */
        list-style-position: inside; /* Corresponds to list-inside */
        margin-bottom: 1rem; /* Corresponds to mb-4 */
    }
    .markdown-content :global(ol) {
        list-style-type: decimal; /* Corresponds to list-decimal */
    }

    .markdown-content :global(a) {
        color: var(--color-accent); /* Use a CSS variable if you have one for accent color */
        text-decoration: none;
    }
    .markdown-content :global(a):hover {
        text-decoration: underline;
    }

    .markdown-content :global(code) {
        background-color: #e2e8f0; /* Corresponds to bg-gray-200 */
        color: #1a202c; /* Text color for light mode */
        border-radius: 0.25rem; /* Corresponds to rounded */
        padding: 0.125rem 0.25rem; /* Corresponds to px-1 py-0.5 */
        font-family: monospace; /* Corresponds to font-mono */
        font-size: 0.875rem; /* Corresponds to text-sm */
    }

    /* Dark mode adjustments for code */
    :global(body.dark) .markdown-content :global(code) {
        background-color: #4a5568; /* Corresponds to dark:bg-gray-700 */
        color: #edf2f7; /* Text color for dark mode */
    }


    .markdown-content :global(pre) {
        background-color: #f7fafc; /* Corresponds to bg-gray-100 */
        padding: 1rem; /* Corresponds to p-3 */
        border-radius: 0.5rem; /* Corresponds to rounded-lg */
        overflow-x: auto; /* Corresponds to overflow-x-auto */
        margin-top: 1rem; /* Corresponds to my-4 */
        margin-bottom: 1rem; /* Corresponds to my-4 */
    }

    /* Dark mode adjustments for pre */
    :global(body.dark) .markdown-content :global(pre) {
        background-color: #4a5568; /* Corresponds to dark:bg-gray-700 */
    }


    .markdown-content :global(blockquote) {
        border-left: 4px solid var(--color-accent); /* Corresponds to border-l-4 border-accent */
        padding-left: 1rem; /* Corresponds to pl-4 */
        font-style: italic; /* Corresponds to italic */
        color: #4a5568; /* Corresponds to text-gray-700 */
        margin-top: 1rem; /* Corresponds to my-4 */
        margin-bottom: 1rem; /* Corresponds to my-4 */
    }

    /* Dark mode adjustments for blockquote */
    :global(body.dark) .markdown-content :global(blockquote) {
        color: #cbd5e0; /* Corresponds to dark:text-gray-300 */
    }


    .markdown-content :global(img) {
        max-width: 100%; /* Corresponds to max-w-full */
        height: auto; /* Corresponds to h-auto */
        border-radius: 0.5rem; /* Corresponds to rounded-lg */
        margin-top: 1rem; /* Corresponds to my-4 */
        margin-bottom: 1rem; /* Corresponds to my-4 */
        display: inline-block; /* Corresponds to inline, useful for vertical alignment */
    }
</style>