<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import { Button } from '@svelteuidev/core';
	import type { PageData } from './$types';
	import { rcon } from '$lib/Rcon';
	
	export let data: PageData

	let url: URL;
	let password: string;

	async function setupConnection(): Promise<void> {
		rcon.connect(url, password, new URL(data.rcon_proxy_server));
	}

	function handleNewCommand(event: CustomEvent<{ command: string }>): void {
		rcon.send(event.detail.command);
	}
</script>

<h1>RCON Console</h1>

<input type="text" bind:value={url} />
<input type="password" bind:value={password} />
<Button on:click={setupConnection}>Connect</Button>

<Terminal on:command={handleNewCommand} lines={$rcon} />
