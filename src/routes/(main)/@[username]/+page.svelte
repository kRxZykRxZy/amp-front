<script lang="ts">
    import ProjectList from '$components/project-list/ProjectList.svelte';
    import Modal from '$components/modal/Modal.svelte';
    import Markdown from '$components/markdown/Markdown.svelte';
    import AppleCatRankup from './apple-cat-rankup.svg';
    import { UsersIcon, Link } from '@lucide/svelte';
    import { isLoggedIn, username } from '$stores/session';

    export let data;

    let userData = data.userData;
    let error = data.error;

    const rankNames = { 0: 'New AmpModder', 1: 'AmpModder', 2: 'Moderator', 3: 'Operator' };
    const serviceNames = {
        scratch: 'Scratch',
        github: 'GitHub',
        codeberg: 'Codeberg',
        wiki: 'AmpMod Wiki',
        forums: 'AmpMod Forums'
    };

    let showRankUpModal = false;

    const FAKE_DELAY = 1000;

    const formatDate = (ts: number) => new Date(ts * 1000).toLocaleDateString();
    const getTimeAgo = (ts: number) => {
        const now = Date.now();
        let diff = now - new Date(ts * 1000).getTime();
        const units = {
            year: 31536000000,
            month: 2592000000,
            day: 86400000,
            hour: 3600000,
            minute: 60000,
            second: 1000
        };
        const parts: string[] = [];
        for (const unit in units) {
            const value = Math.floor(diff / (units as any)[unit]);
            if (value > 0) parts.push(`${value} ${unit}${value > 1 ? 's' : ''}`);
            diff -= value * (units as any)[unit];
            if (parts.length === 2) break;
        }
        return parts.length > 0 ? parts.join(', ') + ' ago' : 'just now';
    };

    const openRankUpModal = () => (showRankUpModal = true);
    const closeRankUpModal = () => (showRankUpModal = false);
    const handleRankUp = async () => {
        console.log('Rank up!');
        closeRankUpModal();
        await new Promise((r) => setTimeout(r, FAKE_DELAY));
        if (userData) userData.rank = 1;
    };
    const toggleFollow = async () => {
        if (!userData) return;
        await new Promise((r) => setTimeout(r, FAKE_DELAY));
        userData.is_following = !userData.is_following;
    };

    const getLinkedAccountUrl = (type: string, id: string) => {
        switch (type) {
            case 'scratch': return `https://scratch.mit.edu/@${id}`;
            case 'github': return `https://github.com/${id}`;
            case 'codeberg': return `https://codeberg.org/${id}`;
            case 'wiki': return `https://ampmod.miraheze.org/wiki/User:${id.replace(' ', '_')}`;
            case 'forums': return `https://ampmod.flarum.cloud/u/${id}`;
            default: return '#';
        }
    };

    // MODIFIED LINE: Safely access data.params.username
    // Check if data.params exists before accessing its properties.
    $: pageTitle = userData?.name
        ? `${userData.name} on AmpMod`
        : (data.params?.username ? `${data.params.username} on AmpMod` : 'AmpMod User Profile');
</script>

<svelte:head><title>{pageTitle}</title></svelte:head>

<div class="user-profile container mx-auto px-4 py-8 md:py-16">
    {#if error}
        <div class="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-200 px-4 py-3 rounded relative text-center" role="alert">
            <strong class="font-bold">Error:</strong>
            <span class="block sm:inline">{error}</span>
            <p class="text-sm mt-2">Ensure this user exists. This may also be a bug; please report it on the <a href="https://ampmod.flarum.cloud/t/bugs-and-glitches" class="text-accent hover:underline">forums</a>.</p>
        </div>
    {:else if userData}
        <div class="header flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <img src={userData.image} alt={`Profile of ${userData.name}`} class="avatar w-28 h-28 md:w-32 md:h-32 rounded-lg object-cover shadow-md" />
                <div class="info flex-grow">
                    <h1 class="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2">{userData.name}</h1>
                    <p class="meta text-lg text-gray-600 dark:text-gray-400">
                        <span class="font-semibold">{rankNames[userData.rank] || 'Unknown Rank'}</span>
                        {#if $username && userData.rank === 0 && userData.name === $username}
                            <button class="rank-up text-accent-secondary hover:underline cursor-pointer" onclick={openRankUpModal}>(Become an AmpModder)</button>
                        {/if}
                        <span class="mx-2">|</span> Joined
                        <span class="font-medium text-gray-700 dark:text-gray-300" title={formatDate(userData.joindate)}>{getTimeAgo(userData.joindate)}</span>
                    </p>
                    {#if Object.keys(userData.linked_accounts || {}).length > 0}
                        <div class="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                            <h3 class="sr-only">Linked Accounts</h3>
                            {#each Object.entries(userData.linked_accounts) as [type, id]}
                                {#if id}
                                    <a href={getLinkedAccountUrl(type, id)} target="_blank" rel="noopener noreferrer"
                                       class="inline-flex items-center px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                        <Link class="w-4 h-4 mr-1" /> {serviceNames[type]}: {id}
                                    </a>
                                {/if}
                            {/each}
                        </div>
                    {/if}
                </div>
            </div>
            <div class="actions mt-4 md:mt-0 flex gap-4">
                {#if $isLoggedIn && $username && userData.name !== $username}
                    <button class={`follow px-6 py-3 rounded-lg font-bold transition-colors shadow-md
                        ${userData.is_following ? 'bg-gray-500 hover:bg-gray-600 text-white' : 'bg-accent hover:bg-accent-secondary text-white'}`}
                        onclick={toggleFollow}>
                        {userData.is_following ? 'Unfollow' : 'Follow'}
                    </button>
                {/if}
            </div>
        </div>

        <div class="content grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div class="bio md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold text-accent mb-4">About me</h2>
                <div class="text-gray-700 dark:text-gray-300 leading-relaxed prose prose-lg dark:prose-invert">
                    <Markdown content={userData.bio} />
                </div>
            </div>
            <div class="badges bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 class="text-2xl font-bold text-accent mb-4">Badges</h2>
                <div class="placeholder border-2 border-dashed border-gray-300 dark:border-gray-600 p-6 rounded-lg text-center text-gray-500 dark:text-gray-400 italic">
                    <UsersIcon class="inline-block w-8 h-8 mb-2" />
                    <p>No badges yet.</p>
                </div>
            </div>
        </div>

        <ProjectList title="Uploaded projects" class="mt-12" />

        <div class="flex flex-row justify-end mt-2">
            <a href={`/@${userData.name}/report`} class="text-red-500">
                Report
            </a>
        </div>

        {#if showRankUpModal}
            <Modal titleContent="Become an AmpModder" bind:show={showRankUpModal} onClose={closeRankUpModal}>
                <div class="flex flex-col items-center p-6 text-center">
                    <img src={AppleCatRankup} alt="Rank up illustration" draggable={false} class="rankup-img max-w-xs md:max-w-sm mb-6" />
                    <p class="text-gray-700 dark:text-gray-300 mb-4 text-lg">Ranking up will grant you more permissions such as using more extensions and proposing projects to be featured!</p>
                    <p class="text-red-500 dark:text-red-400 font-semibold italic mb-6">Once you rank up, you cannot go back. If you want to rank down, contact an operator.</p>
                    <div class="modal-actions flex justify-center gap-4">
                        <button class="primary bg-accent hover:bg-accent-secondary text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors" onclick={handleRankUp}>Rank up!</button>
                        <button class="secondary bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-lg font-bold shadow-md transition-colors" onclick={closeRankUpModal}>Cancel</button>
                    </div>
                </div>
            </Modal>
        {/if}
    {:else}
        <div class="header flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg animate-pulse">
            <div class="flex flex-col md:flex-row items-center gap-6 text-center md:text-left w-full">
                <div class="avatar w-28 h-28 md:w-32 md:h-32 rounded-lg bg-gray-300 dark:bg-gray-700 shadow-md"></div>
                <div class="info flex-grow w-full md:w-auto">
                    <div class="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2 mx-auto md:mx-0"></div>
                    <div class="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mx-auto md:mx-0"></div>
                    <div class="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                        <div class="h-7 bg-gray-300 dark:bg-gray-700 rounded-full w-24"></div>
                        <div class="h-7 bg-gray-300 dark:bg-gray-700 rounded-full w-28"></div>
                    </div>
                </div>
            </div>
            <div class="actions mt-4 md:mt-0 flex gap-4 w-full md:w-auto justify-center md:justify-end">
                <div class="h-12 bg-gray-300 dark:bg-gray-700 rounded-lg w-32"></div>
            </div>
        </div>

        <div class="content grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 animate-pulse">
            <div class="bio md:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div class="h-7 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div class="space-y-3">
                    <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                    <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-11/12"></div>
                    <div class="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
            </div>
            <div class="badges bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div class="h-7 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div class="h-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            </div>
        </div>
    {/if}
</div>
