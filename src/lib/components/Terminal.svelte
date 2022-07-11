<script lang="ts">
    import { TextInput, Paper } from "@svelteuidev/core"
    import { createEventDispatcher } from "svelte";

    export let enabled: boolean = true
    export let lines: string[] = []
    
    let current_line: string = ""

    const dispatch = createEventDispatcher();

    function handleNewCommand(event: KeyboardEvent): void {
        if (event.key !== 'Enter') return

        dispatch('command', {
            command: current_line
        })
        current_line = ''
    }

    function scrollIntoView(node: HTMLElement) {
        node.scrollIntoView({ behavior: "smooth"})
    }
</script>

<Paper>
    <div class="prompts">
        {#each lines as line}
            <p use:scrollIntoView>{line}</p>
        {/each}
    </div>
    <TextInput bind:value={current_line} on:keydown={handleNewCommand} placeholder="Enter your command here"/>
</Paper>

<style>
    .prompts {
        height: 16rem;
        overflow-y: scroll;
    }
</style>