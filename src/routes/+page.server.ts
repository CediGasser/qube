import type { PageServerLoad } from '@sveltejs/kit'
import 'dotenv/config'

export const load: PageServerLoad = async () => {
  const rcon_proxy_server = process.env.RCON_WEBSOCKET_PROXY ?? 'ws://localhost:8765'

  if (rcon_proxy_server) {
    return {rcon_proxy_server}
  }

  throw new Error(`💩`)
}