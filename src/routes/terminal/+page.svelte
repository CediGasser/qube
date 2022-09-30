<script lang="ts">
	import Terminal from '$lib/components/Terminal.svelte';
	import { rcon } from '$lib/Rcon';

	function handleNewCommand(event: CustomEvent<{ command: string }>): void {
		rcon.send(event.detail.command);
	}
</script>

<h1>RCON Console</h1>

<Terminal on:command={handleNewCommand} lines={$rcon} />
