<script lang="ts">
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
</script>

<header>
	<div>
		<a href="/"  class:active={$page.url.pathname === '/'}>
			QR Code Builder
		</a>
		<a href="/terminal" class:active={$page.url.pathname === '/terminal'}>
			Terminal
		</a>
		<a href="/image" class:active={$page.url.pathname === '/image'}>
			Image
		</a>
		<button on:click={() => (opened = true)}>
			Connect
		</button>
	</div>
</header>
<div>

</div>
<main>
	<slot />
</main>

<style>
	main {
		margin: 16px;
	}

	a {
		height: 36px;
		text-decoration: none;
		padding-right: 18px;
		padding-left: 18px;
		border-radius: 4px;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 1;
		width: auto;
	}
	a:hover {
		background-color: rgb(242, 242, 255);
	}
	a:active {
		color: inherit; 
	}
	.active {
		background-color: rgb(230, 230, 255);
	}
</style>
