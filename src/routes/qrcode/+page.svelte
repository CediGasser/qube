<script lang="ts">
    import { QRCode } from '$lib/QRCode'
    import { TextInput } from '@svelteuidev/core'
    import { Button } from '@svelteuidev/core'
    import { BlockRepresentation, type Block } from '$lib/BlockRepresentation'
    import { rcon } from '$lib/Rcon'

    let dataUrl: string
    let text: string
    let baseCoordinates = { x: -200, y: 80, z: -372 }

    $: updateImage(text)

    async function updateImage(newText: string) {
        dataUrl = await QRCode.getDataUrl(newText) ?? ''
    }

    function buildImage() {
        const blockRepresentation = new BlockRepresentation(dataUrl)
        const blockMatrix = blockRepresentation.getBlockMatrix()
        let commands = []
        for (const row of blockMatrix) {
            for (const block of row) {
                commands.push(`setblock ${-200 + block.x} ${80 + block.y} ${-372 + block.z} ${block.id}`)
            }
        }
        rcon.send(commands)
    }

    function clearBlocks() {
        const {x, y, z} = baseCoordinates
        const blockRepresentation = new BlockRepresentation(dataUrl)
        const command = `fill ${x} ${y} ${z} ${x + blockRepresentation.width} ${y + blockRepresentation.height} ${z} minecraft:air`
        rcon.send(command)
    }
</script>

<h1>QR Code Builder</h1>
<TextInput bind:value={text}/>
<img src={dataUrl} alt="Generated QR Code"/>
<Button on:click={buildImage}>Build</Button>
<Button on:click={clearBlocks}>Clear</Button>

<style>
    img {
        width: min(100%, 400px);
        image-rendering: pixelated;
    }
</style>
