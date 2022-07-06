<script lang="ts">
    import Terminal from '$lib/components/Terminal.svelte';
    import { Button } from '@svelteuidev/core';
    import RconConnection from '../lib/RconConnection'

    let url: URL
    let password: string
    let rcon: RconConnection
    let lines: string[] = []

    async function setupConnection() {
        rcon = new RconConnection(url, password)
        lines = [...lines, 'Connection established...']
    }

    function handleNewCommand(event: CustomEvent<any>): void {
        rcon.send(event.detail.command)
        console.log(lines)
        lines = [...lines, event.detail.command ]
    }
</script>

<h1>RCON Console</h1>

<input type="text" bind:value={url}/>
<input type="password" bind:value={password}/>
<Button on:click={setupConnection}>Connect</Button>

<Terminal enabled={Boolean(rcon)} on:command={handleNewCommand} {lines}/>