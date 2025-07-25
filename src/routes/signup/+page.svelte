<script lang="ts">
	import { goto } from '$app/navigation';
	let username = '';
	let password = '';

	async function submit() {
		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username, password })
		});
		if (res.ok) {
			goto('/login');
		} else {
			alert('Sign up failed');
		}
	}
</script>

<form on:submit|preventDefault={submit} class="flex flex-col gap-2 p-4">
	<label>
		Username
		<input bind:value={username} class="border p-1" />
	</label>
	<label>
		Password
		<input type="password" bind:value={password} class="border p-1" />
	</label>
	<button type="submit" class="border px-2 py-1">Sign up</button>
</form>
