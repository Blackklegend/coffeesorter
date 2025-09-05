<script lang="ts">
	import random from 'random';
	import Confetti from './Confetti.svelte';
	import { fade, fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	const pessoas = ['Monte', 'Igor', 'Leo', 'Tinho', 'Guilherme', 'Bansen'];
	const SPIN_DURATION = 1500;
	const SPIN_INTERVAL = 50; // Faster updates for smoother animation
	const ROTATIONS = 12; // Number of full rotations before stopping

	$: currentSpinIndex = 0;
	$: rotationState = 0;
	$: spinningNames = [
		pessoas[currentSpinIndex % pessoas.length],
		pessoas[(currentSpinIndex + 1) % pessoas.length],
		pessoas[(currentSpinIndex + 2) % pessoas.length],
		pessoas[(currentSpinIndex + 3) % pessoas.length]
	];

	let selected: string | undefined;
	export let showConfetti = false;
	let spinning = false;
	let spinInterval: number;

	function startSpinning() {
		spinning = true;
		rotationState = 0;
		spinInterval = setInterval(() => {
			currentSpinIndex++;
			rotationState = currentSpinIndex * 90 + ROTATIONS * 360;
		}, SPIN_INTERVAL);
	}

	function sortearPessoa() {
		showConfetti = false;
		// Define weights for each person (must match pessoas order)
		const weights = [0.3, 0.2, 0.8, 0.9, 0.5, 1.0]; // Example: Tinho=0.3, Bansen=0.2, Igor=0.8, Leo=0.9, Monte=0.5, Guilherme=1.0
		const filteredPessoas = pessoas.filter((p) => p !== selected);
		const filteredWeights = pessoas
			.map((p, i) => ({ p, w: weights[i] }))
			.filter(({ p }) => p !== selected)
			.map(({ w }) => w);

		// Weighted random choice
		function weightedChoice(arr: string[], weights: number[]) {
			const total = weights.reduce((a, b) => a + b, 0);
			let r = random.float(0, total);
			for (let i = 0; i < arr.length; i++) {
				if (r < weights[i]) return arr[i];
				r -= weights[i];
			}
			return arr[arr.length - 1];
		}

		const newPerson = weightedChoice(filteredPessoas, filteredWeights);
		const targetIndex = pessoas.indexOf(newPerson!);
		currentSpinIndex = pessoas.length - targetIndex;
		startSpinning();

		setTimeout(() => {
			clearInterval(spinInterval);
			spinning = false;
			selected = newPerson;
			showConfetti = true;
		}, SPIN_DURATION);
	}
</script>

<div class="relative flex h-full min-h-[400px] w-full items-center justify-center">
	<Confetti active={showConfetti} />

	<div
		class="coffee-sorter-card w-2/4 rounded-lg p-8 text-center shadow-lg dark:shadow-gray-800"
		in:fade={{ duration: 400 }}
	>
		<h2 class="mt-0 mb-4 text-2xl font-bold">Sorteio do Café</h2>

		{#if selected || spinning}
			<div class="flex flex-col items-center" in:fly={{ y: 20, duration: 400, easing: quintOut }}>
				<div>
					<p class="my-4 text-lg">Parabéns, você foi sorteado para fazer café:</p>
				</div>
				<div class="mb-4 w-full">
					<div class="cube-container">
						<div
							class="cube"
							class:spinning
							class:flipped={showConfetti}
							style="--rotation-state: {rotationState}"
						>
							{#each spinningNames as name, i}
								<div
									class="cube-face {i === 0
										? 'front'
										: i === 1
											? 'back'
											: i === 2
												? 'top'
												: 'bottom'}"
								>
									<p class="winner-text text-lg font-bold">
										✨ {name} ✨
									</p>
								</div>
							{/each}
						</div>
					</div>
				</div>
			</div>
		{:else}
			<p in:fade={{ duration: 400 }} class="text-lg">
				Clique no botão para sortear quem vai fazer o café
			</p>
		{/if}

		{#if !spinning}
			<div class="mt-4 flex justify-center gap-2">
				<button
					class="primary-button cursor-pointer rounded-2xl px-3 py-2 font-bold disabled:opacity-50"
					on:click={sortearPessoa}
					disabled={spinning}
				>
					{selected ? 'Novo Sorteio' : 'Sortear'}
				</button>

				{#if selected}
					<button
						class="secondary-button cursor-pointer rounded-2xl px-3 py-2 font-bold"
						on:click={() => {
							selected = undefined;
							showConfetti = false;
						}}
					>
						Limpar
					</button>
				{/if}
			</div>
		{/if}
	</div>
</div>

<style>
	.primary-button {
		background-color: #4ade80;
		color: white;
	}

	.primary-button:hover {
		background-color: #16a34a;
	}

	.secondary-button {
		background-color: #60a5fa;
		color: white;
	}

	.secondary-button:hover {
		background-color: #2563eb;
	}

	.winner-text {
		color: #16a34a;
	}

	.cube-container {
		width: 100%;
		height: 80px;
		perspective: 1000px;
		margin: 0 auto;
	}

	.cube {
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		transform: translateZ(-50px);
		transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
	}

	.cube.spinning {
		transform: translateZ(-50px) rotateX(calc(-1deg * var(--rotation-state)));
	}

	.cube-face {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		display: flex;
		align-items: center;
		justify-content: center;
		background: var(--background);
		border-radius: 8px;
	}

	.cube-face.front {
		transform: rotateX(0deg) translateZ(50px);
	}

	.cube-face.back {
		transform: rotateX(180deg) translateZ(50px);
	}

	.cube-face.top {
		transform: rotateX(90deg) translateZ(50px);
	}

	.cube-face.bottom {
		transform: rotateX(-90deg) translateZ(50px);
	}

	@keyframes spinCube {
		0% {
			transform: translateZ(-50px) rotateX(0deg);
		}
		100% {
			transform: translateZ(-50px) rotateX(-360deg);
		}
	}

	.cube.flipped {
		animation: none;
		transform: translateZ(-50px) rotateX(180deg);
	}
</style>
