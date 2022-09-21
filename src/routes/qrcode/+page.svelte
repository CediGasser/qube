<script lang="ts">
    import { QRCode } from '$lib/QRCode'
    let canvas: HTMLCanvasElement
    let text: string
    // text = document.getElementById('text') as unknown as string
    $: canvas = new QRCode(text).getCanvas()
</script>

<h1>QR Code Builder</h1>
<input id=text value="Initial Value"/>
<canvas bind:this={canvas}></canvas>