import type { ServerLoad } from '@sveltejs/kit'
import 'dotenv/config'

export const load: ServerLoad = async () => {
  const rcon_proxy_server = process.env.RCON_WEBSOCKET_PROXY ?? 'ws://localhost:8765'

  return {
    rcon_proxy_server
  }
}