<script lang="ts">
	import TextInput from '$lib/components/TextInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import { scrollIntoView } from '$lib/Actions';

	export let enabled = false;
	export let lines: string[] = [];

	let current_line = '';

	const dispatch = createEventDispatcher();

	// on Enter, dispatch event 'command'
	function handleKeyUp(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			dispatch('command', { command: current_line });
			current_line = '';
		}
	}
</script>

<div>
	<div class="prompts" class:enabled>
		{#each lines as line}
			<p use:scrollIntoView>{line}</p>
		{/each}
	</div>
	<TextInput
		bind:value={current_line}
		on:keyup={handleKeyUp}
		label="Command"
		placeholder="Enter your command here"
	>
	</TextInput>
</div>

<style>
	.prompts {
		height: 16rem;
		overflow-y: scroll;
	}

	.enabled {
		background-color: aqua;
	}
</style>
