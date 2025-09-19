<script lang="ts">
    import '../../../app.css';
    import logoUrl from './logo.svg';
    import computerUpdateUrl from './26quantum-delivery.svg';

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

<div class="absolute bottom-4 right-4 m-2 text-white flex flex-col">
    <img src={logoUrl} alt="AmpMod" class="h-8 w-auto" />
    <p>&copy; AmpMod contributors.</p>
</div>
<div class="site-wrapper min-h-screen flex flex-row items-center justify-center text-white bg-gradient-to-br from-accent to-accent-secondary px-8">
    <div class="flex flex-row items-center justify-center gap-12">
        <img src={computerUpdateUrl} alt="Apple Cat holding a box." class="w-64 h-64 object-contain drop-shadow-xl" />
        <div class="flex flex-col items-start justify-center max-w-lg">
            <p class="text-xl opacity-90 mb-6">On <span class="font-bold text-accent-foreground">February 3rd, 2026</span>, AmpMod will be like never before. See you then!</p>
            <span class="text-base opacity-80 mb-2">Stay updated on the <a href="https://ampmod.flarum.cloud/blog" class="underline text-white">AmpMod Blog</a>.</span>
            <span class="text-base opacity-80">You can still make projects <a href="https://edit.ampmod.org" class="underline text-white">here</a>.</span>
        </div>
    </div>
</div>