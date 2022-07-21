<script lang="ts">
	import { SvelteUIProvider, Header, Group, Button } from '@svelteuidev/core';
	import { page } from '$app/stores';
</script>

<SvelteUIProvider withGlobalStyles withNormalizeCSS ssr>
	<Header override={{ p: '$mdPX' }}>
		<Group spacing="xs" position="center" override="">
			<Button href="/" variant={$page.url.pathname === '/' ? 'light' : 'subtle'}
				>RCON Console</Button
			>
			<Button href="/qrcode" variant={$page.url.pathname === '/qrcode' ? 'light' : 'subtle'}
				>QR code builder</Button
			>
			<Button href="/itemshop" variant={$page.url.pathname === '/itemshop' ? 'light' : 'subtle'}
				>Item Shop</Button
			>
		</Group>
	</Header>
	<main>
		<slot />
	</main>
</SvelteUIProvider>

<style>
	main {
		margin: 16px;
	}
</style>
