<script lang="ts">
    import { QRCode } from '$lib/QRCode'
    import { TextInput } from '@svelteuidev/core'

    let dataUrl: string
    let text: string
    // text = document.getElementById('text') as unknown as string
    $: updateImage(text)

    async function updateImage(newText: string) {
        dataUrl = await QRCode.getDataUrl(newText) ?? ''
    }
</script>

<h1>QR Code Builder</h1>
<TextInput bind:value={text}/>
<img src={dataUrl} alt="Generated QR Code"/>

<style>
    img {
        width: min(100%, 400px);
        image-rendering: pixelated;
    }
</style>