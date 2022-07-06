<script lang="ts">
    import { TextInput, Paper } from "@svelteuidev/core"
    import { createEventDispatcher } from "svelte";

    export let enabled: boolean = true
    export let lines: string[] = []
    
    let current_line: string = ""

    const dispatch = createEventDispatcher();

    function handleNewCommand(event: { key: string; }) {
        if (event.key !== 'Enter') return

        dispatch('command', {
            command: current_line
        })
        current_line = ''
    }
</script>

<Paper>
    <div class="prompts">
        {#each lines as line}
            <p>{line}</p>
        {/each}
    </div>
    <TextInput bind:value={current_line} on:keydown={handleNewCommand} placeholder="Enter your command here"/>
</Paper>

<style>
    #terminal {
        max-width: 800px;
    }

    .prompts {
        min-height: 16rem;
    }

    .wraper {

    }
</style>