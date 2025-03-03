<script lang="ts">
	import { page } from '$app/stores';
	import { rcon } from '$lib/Rcon';
	import type { PageData } from './$types';
	import '$lib/assets/css/reset.css';
	import '$lib/assets/css/app.css';

	export let data: PageData;

	let opened = false;
	let serverURL: string = '';
	let password: string = '';

	async function setupConnection(): Promise<void> {
		console.log(serverURL);
		console.log(password);
		console.log(data.rcon_proxy_server);
		rcon.connect(serverURL, password, data.rcon_proxy_server);
	}
</script>

<header>
	<ul>
		<li>
			<a href="/" class:active={$page.url.pathname === '/'}> QR Code Builder </a>
		</li>
		<li>
			<a href="/terminal" class:active={$page.url.pathname === '/terminal'}> Terminal </a>
		</li>
		<li>
			<a href="/image" class:active={$page.url.pathname === '/image'}> Image </a>
		</li>
	</ul>

	<div class="connection">
		<input type="text" bind:value={serverURL} placeholder="Server URL" />
		<input type="password" bind:value={password} placeholder="Password" />
		<button on:click={setupConnection}> Connect </button>
	</div>
</header>

<main>
	<slot />
</main>

<style>
	ul {
		list-style-type: none;
		padding: 0;
		margin: 0;
		display: flex;
	}

	main {
		margin: 16px;
	}

	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: rgb(255, 255, 255);
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
		padding: 8px 16px;
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
