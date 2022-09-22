<script lang="ts">
	import { SvelteUIProvider, Header, Group, Button, TextInput } from '@svelteuidev/core';
	import Modal from '$lib/components/Modal.svelte';
	import { page } from '$app/stores';
	import { rcon } from '$lib/Rcon';
	import type { PageData } from './$types';

	export let data: PageData;

	let opened = false;
	let serverURL: string;
	let password: string;

	async function setupConnection(): Promise<void> {
		console.log(serverURL)
		console.log(password)
		console.log(data.rcon_proxy_server)
		rcon.connect(serverURL, password, data.rcon_proxy_server);
	}

	let config = {
        light: { bg: 'White', color: 'Black' },
        dark: { bg: '#1A1B1E', color: '#C1C2C5' }
    };
</script>

<SvelteUIProvider {config} withGlobalStyles withNormalizeCSS ssr>
	<Header override={{ p: '$mdPX' }} height=60>
		<Group spacing="xs" position="center">
			<a href="/"  class:active={$page.url.pathname === '/'}>
				RCON Console
			</a>
			<a href="/qrcode" class:active={$page.url.pathname === '/qrcode'}>
				QR code builder
			</a>
			<a href="/itemshop" class:active={$page.url.pathname === '/itemshop'}>
				Item Shop
			</a>
			<Button on:click={() => (opened = true)} variant="gradient">
				Connect
			</Button>
		</Group>
	</Header>
	<div>

	</div>
	<main>
		<slot />
	</main>
</SvelteUIProvider>

<style>
	main {
		margin: 16px;
	}

	.active {
		color: rgb(0, 187, 255);
	}
</style>
