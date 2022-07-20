<script lang="ts">
	import { TextInput, Paper, Overlay } from '@svelteuidev/core';
	import { createEventDispatcher } from 'svelte';

	export let enabled: boolean = false;
	export let lines: string[] = [];

	let current_line: string = '';

	const dispatch = createEventDispatcher();

	function handleNewCommand(event: CustomEvent<KeyboardEvent>): void {
		if (event.key !== 'Enter') return;

		dispatch('command', {
			command: current_line
		});
		current_line = '';
	}

	function scrollIntoView(node: HTMLElement) {
		node.scrollIntoView({ behavior: 'smooth' });
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
		on:keyup={handleNewCommand}
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
