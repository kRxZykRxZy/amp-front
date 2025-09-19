<script lang="ts">
    import '../../../app.css';
    import logoUrl from './logo.svg';
    import computerUpdateUrl from './computer-update.svg';
    let { children } = $props();

    if (true) {
        console.warn(
            '%cSCAM ALERT! Do NOT paste anything into the console!',
            "color: red; font-size: 3em; font-weight: bold; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        );
        console.log(
            "%cDo NOT paste anything into the console that someone you don't know asked you to! They can log in to your account, create inappropriate projects, delete your legitimate projects, and get your account banned! If you don't know what JavaScript is, exit now.",
            "font-size: 18px; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;"
        );
    }
</script>

<div class="absolute top-4 left-4 m-2">
    <img src={logoUrl} alt="AmpMod" class="h-8 w-auto" />
</div>
<div class="site-wrapper min-h-screen flex flex-col items-center justify-center text-white bg-accent">
    <div class="flex flex-col items-center justify-center">
        <img src={computerUpdateUrl} alt="Computer Update" class="w-auto mb-4 drop-shadow-lg" />
        <h1 class="text-4xl font-extrabold mb-2 drop-shadow-lg">Boot. Updating... (1,000 years remaining.)</h1>
        <p class="text-lg opacity-90 mb-4">AmpMod is currently down to add some awesome features. Please check back soon!</p>
        <span class="text-sm opacity-70">You can stay updated on the <a href="https://ampmod.flarum.cloud/blog" class="underline text-white">AmpMod Blog</a> or <a href="https://status.ampmod.org" class="underline text-white">Status Page</a>.</span>
    </div>
</div>