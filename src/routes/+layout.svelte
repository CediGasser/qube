<script lang="ts">
	import Modal from '$lib/components/Modal.svelte';
	import { page } from '$app/stores';
	import { rcon } from '$lib/Rcon';
	import type { PageData } from './$types';
	import '$lib/assets/css/reset.css';
	import '$lib/assets/css/app.css';

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
	<select>
		<option>
			<a href="/" class:active={$page.url.pathname === '/'}>
				QR Code Builder
			</a>
		</option>
		<option>
			<a href="/terminal" class:active={$page.url.pathname === '/terminal'}>
				Terminal
			</a>
		</option>
		<option>
			<a href="/image" class:active={$page.url.pathname === '/image'}>
				Image
			</a>
		</option>
	</select>
	<button on:click={() => (opened = true)}>
		Connect
	</button>
</header>

<main>
	<slot />
</main>

<style>
	main {
		margin: 16px;
	}

	header a {
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
	header a:hover {
		background-color: rgb(242, 242, 255);
	}
	header a:active {
		color: inherit; 
	}
	.active {
		background-color: rgb(230, 230, 255);
	}
</style>
