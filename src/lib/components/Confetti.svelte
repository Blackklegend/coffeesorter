<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let active = false;

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
	const particles: Particle[] = [];

	const possibleColors = [
		'#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3',
		'#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39',
		'#FFEB3B', '#FFC107', '#FF9800', '#FF5722'
	];
	const PARTICLE_COUNT = 150;

	$: if (active) {
		startConfetti();
	} else {
		stopConfetti();
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
                if (confettiContext && canvas) {
                        confettiContext.clearRect(0, 0, canvas.width, canvas.height);
                }
                particles.length = 0;
        }

	onDestroy(() => {
		stopConfetti();
	});
</script>

<canvas bind:this={canvas} class="absolute inset-0 w-full h-full pointer-events-none z-10"></canvas>
