<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import { Button } from '@svelteuidev/core';
	import RconConnection from '../lib/RconConnection';

	let url: URL;
	let password: string;
	let rcon: RconConnection;
	let lines: string[] = [];

	async function setupConnection(): Promise<void> {
		rcon = new RconConnection(url, password);
		rcon.open();
		rcon.onopen = () => {
			lines = [...lines, 'Connection established'];
		};
		rcon.onmessage = (event) => {
			lines = [...lines, event.data];
		};
		rcon.onclose = (event) => {
			lines = [...lines, 'Connection closed: ' + event.code + ' ' + event.reason];
		};
	}

	function handleNewCommand(event: CustomEvent<{command: string}>): void {
		lines = [...lines, event.detail.command];
		rcon.send(event.detail.command);
	}
</script>

<h1>RCON Console</h1>

<input type="text" bind:value={url} />
<input type="password" bind:value={password} />
<Button on:click={setupConnection}>Connect</Button>

<Terminal on:command={handleNewCommand} {lines} />
