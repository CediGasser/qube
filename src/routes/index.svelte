<script lang="ts">
    import type { Terminal } from 'xterm'
    import console from '../lib/xterm'
    import 'xterm/css/xterm.css'
    import RconConnection from '../lib/RconConnection'
import { Button } from '@svelteuidev/core';

    let terminal: Terminal
    let rcon: RconConnection
    let url: URL
    let password: string
    let current_line = ""

    async function setupRcon() {
        rcon = new RconConnection(url, password)

        let { Terminal } = await import('xterm')
        terminal = new Terminal({
            cursorBlink: true
        })

        terminal.onKey((event, a) => {
            current_line += event.key
            terminal.write(event.key)
        })

        terminal.onLineFeed((a, b) => {
            rcon.send(current_line)
        })
    }
</script>

<h1>RCON Console</h1>

<input type="text" bind:value={url}/>
<input type="password" bind:value={password}/>
<Button on:click={setupRcon}>Login</Button>

{#if terminal}
    <div id="terminal" use:console={terminal} />
{/if}

<style>
    #terminal {
        max-width: 800px;
    }
</style>