<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import random from 'random'

    type Particle = {
        x: number;
        y: number;
        color: string;
        size: number;
        speed: number;
        angle: number;
        rotation: number;
    };

	let canvas: HTMLCanvasElement;

	let confettiContext;
	let confettiAnimationId: number | undefined;
	let selected: string | undefined;
	const particles: Particle[] = [];

	const pessoas = ['Tinho', 'Bansen', 'Igor', 'Monte'];
	const possibleColors = [
		'#f44336',
		'#e91e63',
		'#9c27b0',
		'#673ab7',
		'#3f51b5',
		'#2196f3',
		'#03a9f4',
		'#00bcd4',
		'#009688',
		'#4CAF50',
		'#8BC34A',
		'#CDDC39',
		'#FFEB3B',
		'#FFC107',
		'#FF9800',
		'#FF5722'
	];
	const PARTICLE_COUNT = 150;

	function sortearPessoa() {
		stopConfetti();
		selected = "Igor"//random.choice(pessoas);
		startConfetti();
	}

	function startConfetti() {
		if (!canvas) return;
		confettiContext = canvas.getContext('2d');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		particles.length = 0;
		createParticles();
		animateConfetti();
	}

	function createParticles() {
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			particles.push({
				x: Math.random() * window.innerWidth,
				y: Math.random() * window.innerHeight - window.innerHeight,
				color: possibleColors[Math.floor(Math.random() * possibleColors.length)],
				size: Math.random() * 10 + 5,
				speed: Math.random() * 3 + 2,
				angle: Math.random() * 6.28,
				rotation: Math.random() * 0.2 - 0.1
			});
		}
	}

	function animateConfetti() {
		if (!canvas) return;
		confettiContext!.clearRect(0, 0, canvas.width, canvas.height);

		for (let p of particles) {
			confettiContext!.beginPath();
			confettiContext!.moveTo(p.x, p.y);
			confettiContext!.lineTo(p.x + p.size * Math.cos(p.angle), p.y + p.size * Math.sin(p.angle));
			confettiContext!.strokeStyle = p.color;
			confettiContext!.lineWidth = p.size / 3;
			confettiContext!.stroke();

			p.y += p.speed;
			p.angle += p.rotation;

			if (p.y > canvas.height) {
				p.y = -20;
				p.x = Math.random() * canvas.width;
			}
		}

		confettiAnimationId = requestAnimationFrame(animateConfetti);
	}

	function stopConfetti() {
		if (confettiAnimationId) {
			cancelAnimationFrame(confettiAnimationId);
			confettiAnimationId = undefined;
		}
		particles.length = 0;
	}

	onDestroy(() => {
		stopConfetti();
	});
</script>

<div class="container">
	<canvas bind:this={canvas} class="confetti-canvas"></canvas>

	<div class="content">
		<h2>Sorteio do Café</h2>

		{#if selected}
			<p class="result">Parabéns, você foi sorteado para fazer café: ✨ {selected} ✨</p>
		{:else}
			<p>Clique no botão para sortear quem vai fazer o café</p>
		{/if}

		<div class="buttons">
			<button class="primary" on:click={sortearPessoa}>
				{selected ? 'Novo Sorteio' : 'Sortear'}
			</button>
		</div>
	</div>
</div>

<style>
	.container {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 400px;
	}

	.confetti-canvas {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}

	.content {
		background-color: white;
		padding: 2rem;
		border-radius: 8px;
		text-align: center;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	h2 {
		margin-top: 0;
		color: #333;
	}

	.result {
		font-size: 1.2rem;
		margin: 1rem 0;
	}

	.buttons {
		display: flex;
		gap: 0.5rem;
		justify-content: center;
		margin-top: 1rem;
	}

	.primary {
		padding: 0.5rem 1rem;
		background-color: #4caf50;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}

	.primary:hover {
		background-color: #45a049;
	}
</style>
