import type { ServerLoad } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const load: ServerLoad = async () => {
	const rcon_proxy_server = env.RCON_WEBSOCKET_PROXY ?? 'ws://localhost:8765';

	return {
		rcon_proxy_server
	};
};
