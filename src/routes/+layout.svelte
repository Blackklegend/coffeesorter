<script lang="ts">
	import '../app.css';
	let { children } = $props();
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Confetti from '$lib/components/Confetti.svelte';

	let showConfetti = false;
</script>

<div class="layout">
	<Confetti active={showConfetti} />
	<nav class="absolute w-full">
		<ThemeToggle />
	</nav>
	{@render children()}
</div>

<style>
	.layout {
		min-height: 100vh;
	}

	nav {
		padding: 1rem;
		display: flex;
		justify-content: flex-end;
	}
</style>
