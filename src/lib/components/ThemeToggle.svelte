<script>
    import { onMount } from 'svelte';

    let isDark = false;

    onMount(() => {
        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        isDark = savedTheme === 'dark' || 
            (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
        setTheme(isDark);
    });

    function toggleTheme() {
        isDark = !isDark;
        setTheme(isDark);
    }

    /**
	 * @param {boolean} dark
	 */
    function setTheme(dark) {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        document.body.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }
</script>

<button on:click={toggleTheme} aria-label="Toggle theme" class="z-10">
    {#if isDark}
        🌙
    {:else}
        ☀️
    {/if}
</button>

<style>
    button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        font-size: 1.5rem;
        border-radius: 50%;
    }

    button:hover {
        background-color: var(--background);
        opacity: 0.8;
    }
</style>