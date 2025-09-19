<script lang="ts">
    import { onMount } from 'svelte';
    import Header from '$components/header/Header.svelte';
    import Footer from '$components/footer/Footer.svelte';
    import Hero from '$components/hero/Hero.svelte';
    import Intro from '$components/intro/Intro.svelte';
    import ProjectList from '$components/project-list/ProjectList.svelte';
    import Modal from '$components/modal/Modal.svelte';
    import ToggleSwitch from '$components/toggle-switch/ToggleSwitch.svelte';
    import LeftTabbed from '$components/tabbed/LeftTabbed.svelte';
    import Scaffolding from '$components/scaffolding/Scaffolding.svelte';

    let showModal = false;
    let toggleVal = false;
    let activeTab = 0;

    let tabs = [
        { label: 'Tab 1', content: 'Content of tab 1' },
        { label: 'Tab 2', content: 'Content of tab 2' },
        { label: 'Tab 3', content: 'Content of tab 3' }
    ];

    const openModal = () => {
        showModal = true;
    };

    const closeModal = () => {
        showModal = false;
    };
</script>

<Header />

<main style="padding: 2em; max-width: 1200px; margin: 0 auto;">
    <h1>Component Test Page</h1>

    <section style="margin-bottom: 2em;">
        <h2>Hero Component</h2>
        <Hero />
    </section>

    <section style="margin-bottom: 2em;">
        <h2>Intro Component</h2>
        <Intro />
    </section>

    <section style="margin-bottom: 2em;">
        <h2>Toggle Switch Test</h2>
        <ToggleSwitch bind:checked={toggleVal} />
        <p>Toggle is: {toggleVal ? "On" : "Off"}</p>
    </section>

    <section style="margin-bottom: 2em;">
        <h2>Tabbed Component</h2>
        <LeftTabbed {tabs} active={activeTab} />
    </section>

    <section style="margin-bottom: 2em;">
        <h2>Project List</h2>
        <ProjectList title="Test Projects" />
    </section>

    <Scaffolding />
</main>

<Footer />