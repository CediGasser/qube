<script lang="ts">
	import { run } from 'svelte/legacy';

	import { QRCode } from '$lib/QRCode';
	import { BlockRepresentation } from '$lib/BlockRepresentation';
	import { rcon } from '$lib/Rcon';
	import TextInput from '$lib/components/TextInput.svelte';

	let dataUrl: string = $state('');
	let text: string = $state('');
	let baseCoordinates = { x: -200, y: 80, z: -372 };
	let inputIsQRCode = true;

	async function updateImage(newText: string) {
		dataUrl = (await QRCode.getDataUrl(newText || ' ')) ?? '';
	}

	function buildImage() {
		const blockRepresentation = new BlockRepresentation(dataUrl);
		const blockMatrix = blockRepresentation.getBlockMatrix();
		let commands = [];
		for (const row of blockMatrix) {
			for (const block of row) {
				commands.push(`setblock ${-200 + block.x} ${80 + block.y} ${-372 + block.z} ${block.id}`);
			}
		}
		rcon.send(commands);
	}

	function clearBlocks() {
		const { x, y, z } = baseCoordinates;
		const blockRepresentation = new BlockRepresentation(dataUrl);
		const command = `fill ${x} ${y} ${z} ${x + blockRepresentation.width} ${y + blockRepresentation.height} ${z} minecraft:air`;
		rcon.send(command);
	}
	run(() => {
		updateImage(text);
	});
</script>

<h1>QR Code Builder</h1>
<TextInput bind:value={text} label="Text" />

<img src={dataUrl} alt="Generated QR Code" />
<button onclick={buildImage}>Build</button>
<button onclick={clearBlocks}>Clear</button>

<style>
	img {
		width: min(100%, 400px);
		image-rendering: pixelated;
	}
</style>
