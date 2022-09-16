<script lang="ts">
	import { TextInput, Paper, Overlay } from '@svelteuidev/core';
	import { createEventDispatcher } from 'svelte';
	import { scrollIntoView } from '$lib/Actions';

	export let enabled = false;
	export let lines: string[] = [];

	let current_line = '';

	const dispatch = createEventDispatcher();

	// on Enter, dispatch event 'command'
	function handleKeyDown(event: CustomEvent<KeyboardEvent>): void {
		let keyEvent = event as unknown as KeyboardEvent
		if (keyEvent.key === 'Enter') {
			dispatch('command', { command: current_line });
			current_line = '';
		}
	}
</script>

<Paper>
	<div class="prompts" class:enabled>
		{#each lines as line}
			<p use:scrollIntoView>{line}</p>
		{/each}
	</div>
	<TextInput
		bind:value={current_line}
		on:keyup={handleKeyDown}
		placeholder="Enter your command here"
	>
		{#if !enabled}
			<Overlay opacity={0.6} color="#000" zIndex={5} />
		{/if}
	</TextInput>
</Paper>

<style>
	.prompts {
		height: 16rem;
		overflow-y: scroll;
	}

	.enabled {
		background-color: aqua;
	}
</style>
