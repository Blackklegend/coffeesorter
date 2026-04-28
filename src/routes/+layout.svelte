<script lang="ts">
	import '../app.css';
	let { children, data } = $props();
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import Confetti from '$lib/components/Confetti.svelte';

	let showConfetti = false;
</script>

<div class="layout">
	<Confetti active={showConfetti} />
	<nav class="absolute flex w-full justify-end gap-4">
		<ThemeToggle />
		{#if data.user}
			<form method="POST" action="/api/auth/logout">
				<button>Logout ({data.user})</button>
			</form>
		{:else}
			<a href="/login">Login</a>
			<a href="/signup">Sign up</a>
		{/if}
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
