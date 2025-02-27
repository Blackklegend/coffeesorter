<script lang="ts">
	import random from 'random';
	import Confetti from './Confetti.svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';

	let selected: string | undefined;
	let showConfetti = false;

	const pessoas = ['Tinho', 'Bansen', 'Igor', 'Monte'];

	function sortearPessoa() {
		showConfetti = false;
		selected = random.choice(pessoas);
		showConfetti = true;
	}
</script>

<div class="relative w-full h-full flex justify-center items-center min-h-[400px]">
	<Confetti active={showConfetti} />

	<div class="bg-white p-8 rounded-lg text-center shadow-lg">
		<h2 class="mt-0 text-2xl font-bold text-gray-800 mb-4">Sorteio do Café</h2>

		{#if selected}
			{#each [selected] as person (person)}
				<p class="text-lg my-4" 
					in:fade={{ duration: 400 }}
				>
					Parabéns, você foi sorteado para fazer café: ✨ {person} ✨
				</p>
			{/each}
		{:else}
			<p in:fade={{ duration: 400 }} class="text-gray-600 text-lg">Clique no botão para sortear quem vai fazer o café</p>
		{/if}

		<div class="flex gap-2 justify-center mt-4">
			<button class="bg-green-400 hover:bg-green-700 rounded-2xl px-3 py-2 text-white font-bold" on:click={sortearPessoa}>
				{selected ? 'Novo Sorteio' : 'Sortear'}
			</button>
			{#if selected}
				<button class="bg-blue-400 hover:bg-blue-600 rounded-2xl px-3 py-2 text-white font-bold" on:click={() => {selected=undefined; showConfetti=false}}>
					Limpar
				</button>
			{/if}
		</div>
	</div>
</div>
