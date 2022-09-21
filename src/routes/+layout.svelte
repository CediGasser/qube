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
			<Button href="/" variant={$page.url.pathname === '/' ? 'light' : 'subtle'}>
				RCON Console
			</Button>
			<Button href="/qrcode" variant={$page.url.pathname === '/qrcode' ? 'light' : 'subtle'}>
				QR code builder
			</Button>
			<Button href="/itemshop" variant={$page.url.pathname === '/itemshop' ? 'light' : 'subtle'}>
				Item Shop
			</Button>
			<Button on:click={() => (opened = true)} variant="gradient">
				Connect
			</Button>
		</Group>
	</Header>
	<div>
		<Modal bind:opened={opened} on:close={setupConnection}>
			<TextInput bind:value={serverURL}></TextInput>
			<TextInput bind:value={password}></TextInput>
		</Modal>
	</div>
	<main>
		<slot />
	</main>
</SvelteUIProvider>

<style>
	main {
		margin: 16px;
	}
</style>
