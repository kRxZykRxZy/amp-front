<script>
    import { onMount } from 'svelte';
    import { page } from '$app/state'; // Correct import path for SvelteKit page store
    const fetchUsername = page.params.username;
    import Banner from '$components/banner/Banner.svelte';
    let reason = ''; // Use `let` for reactive variables
    // Lifecycle hook to handle any setup when the component mounts
    onMount(() => {
        // You can add any initialization logic here if needed
    });
</script>

<Banner text="Report a user" />

<div class="max-w-4xl mx-auto mt-8 p-8 border border-gray-300 dark:border-gray-700 rounded-lg shadow-md bg-white dark:bg-gray-800">
    <p class="text-gray-700 dark:text-gray-300 mb-4">
        You are reporting {fetchUsername}. Please read the
        <a href="/proj-guidelines" class="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 underline">Project Uploading Guidelines</a>.
    </p>
    <strong class="text-red-600 dark:text-red-400 mb-6 block">Spam, joke, or troll reports may result in a ban.</strong>

    <form class="flex flex-col gap-6" method="POST" action="?/report">
        <div class="flex flex-col">
            <label for="reason" class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Reason for Reporting:</label>
            <select
                id="reason"
                name="reason"
                required
                bind:value={reason}
                class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <option disabled selected hidden>Choose an option</option>
                <option value="dislike">I don't like this user.</option>
                <option value="brokenprojects">This user makes projects that do not work.</option>
                <option value="spam" >This user is spamming AmpMod.</option>
                <option value="harassment">This user is harassing me or others.</option>
                <option value="impersonation">This user is impersonating me or someone else.</option>
                <option value="scam">This user is scamming others.</option>
                <hr />
                <option value="other">Other</option>
                <option value="lol">No reason</option>
            </select>
        </div>

        {#if reason === "dislike"}
            <p class="text-red-500 bg-red-50 p-3 rounded-md border border-red-200 dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                Please note that reporting a user just because you dislike them is not allowed and may result in a ban.
            </p>
        {:else if reason === "brokenprojects"}
            <p class="text-red-500 bg-red-50 p-3 rounded-md border border-red-200 dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                Please note that reporting a user for broken projects is not allowed and may result in a ban. Instead, provide constructive feedback to the user.
            </p>
        {:else if reason === "lol"}
            <p class="text-red-500 bg-red-50 p-3 rounded-md border border-red-200 dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                Reporting a user for no reason is not allowed and may result in a ban.
            </p>
        {:else if reason === "csam"}
            <p class="text-red-500 bg-red-50 p-3 rounded-md border border-red-200 dark:bg-red-900 dark:border-red-700 dark:text-red-200">
                <span class="text-3xl">This is a serious matter. We do not accept reports related to it. Please contact the authorities and the content will be wiped.</span>
            </p>
        {:else if reason !== ""}
            <div class="flex flex-col">
                <label for="details" class="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Details:</label>
                <textarea
                    id="details"
                    name="details"
                    placeholder="Provide additional details about the report..."
                    required={reason === "other"}
                    minlength={90 ? reason === "other" : 0}
                    rows="5"
                    class="block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 transition duration-150 ease-in-out"
                ></textarea>
            </div>

            <button
                type="submit"
                class="mt-4 px-6 py-3 bg-accent text-white font-bold rounded-md shadow-lg hover:bg-accent-secondary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition duration-150 ease-in-out self-end"
            >
                Submit Report
            </button>
        {/if}
    </form>
</div>