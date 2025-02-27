<script>
	import CoffeeSorter from '$lib/components/CoffeeSorter.svelte';
</script>

<main>
	<CoffeeSorter />
</main>

<style>
	@reference "tailwindcss/theme";
	main {
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f6f6f6;
	}
</style>
