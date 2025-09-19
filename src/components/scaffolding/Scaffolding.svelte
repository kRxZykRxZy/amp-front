<!--
For those who don't understand:
This file is a Svelte component that uses a modified version of TurboWarp's scaffolding library
to run a project. We customized scaffolding specifically for use with AmpMod.
We were originally going to use the full ampmod scratch-gui and a React preprocessor,
but we were having trouble getting it to install, so we stuck with scaffolding instead.
-->

<script>
    import { Flag, Octagon, ExpandIcon } from '@lucide/svelte';

    function handleGreenFlag() {
        console.log('Green flag clicked');
    }

    function handleStop() {
        console.log('Stop button clicked');
    }

    function handleFullscreen() {
        console.log('Fullscreen button clicked');
    }
</script>

<div class="project">
    <div class="project-controls">
        <div>
            <button class="project-control green-flag" on:click={handleGreenFlag}>
                <Flag size={18} fill="#4cbf56" color="#45993d" />
            </button>
            <button class="project-control stop" on:click={handleStop}>
                <Octagon size={18} fill="#ec5959" color="#b84848" />
            </button>
        </div>
        <div>
            <button class="project-control fullscreen" on:click={handleFullscreen}>
                <ExpandIcon size={18} />
            </button>
        </div>
    </div>
    <div class="project-screen">
        <!-- Project stage content goes here -->
    </div>
</div>

<style>
    .project {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        border-radius: 8px;
        max-width: 800px;
        min-width: 480px;
    }

    .project-controls {
        display: flex;
        justify-content: space-between;
        width: 360px; /* Match the width of .project-screen */
        margin-bottom: 6px;
    }

    .project-controls div {
        display: flex;
        gap: 0.2rem;
    }

    .project-control {
        border: none;
        border-radius: 4px;
        padding: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        background: none;
    }

    .project-control:hover {
        background: var(--accent-transparent);
    }

    .project-screen {
        width: 360px;
        aspect-ratio: 4 / 3;
        background-color: white; /* Scratch projects have a white background */
        border: 1px var(--border-color) solid;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>