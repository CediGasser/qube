<script lang="ts">
    import Terminal from '$lib/components/Terminal.svelte';
    import { Button } from '@svelteuidev/core';
    import RconConnection from '../lib/RconConnection'

    let url: URL
    let password: string
    let rcon: RconConnection
    let lines: string[] = []
    let enabled = false

    async function setupConnection() {
        rcon = new RconConnection(url, password)
        rcon.open()
        rcon.onopen = () => {
            lines = [...lines, "Connection established"]
            enabled = true
        }
        rcon.onmessage = (event) => { lines = [...lines, event.data] }
        rcon.onclose = (event) => { 
            lines = [...lines, 'Connection closed: ' + event.reason]
            enabled = false 
        }
    }

    function handleNewCommand(event: CustomEvent<any>): void {
        lines = [...lines, event.detail.command ]
        rcon.send(event.detail.command)
    }
</script>

<h1>RCON Console</h1>

<input type="text" bind:value={url}/>
<input type="password" bind:value={password}/>
<Button on:click={setupConnection}>Connect</Button>

<Terminal {enabled} on:command={handleNewCommand} {lines}/>