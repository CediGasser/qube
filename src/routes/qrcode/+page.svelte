<script lang="ts">
    import { QRCode } from '$lib/QRCode'
    import { TextInput } from '@svelteuidev/core'

    let canvas: HTMLCanvasElement
    let text: string
    // text = document.getElementById('text') as unknown as string
    $: updateCanvas(text)

    async function updateCanvas(newText: string) {
        let newCanvas = await new QRCode(text).getCanvas()
        if (newCanvas) {
            canvas.replaceWith(newCanvas)
            canvas = newCanvas
        }
    }
</script>

<h1>QR Code Builder</h1>
<TextInput bind:value={text}/>
<canvas bind:this={canvas}></canvas>