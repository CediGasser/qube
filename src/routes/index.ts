import type { RequestHandler } from '@sveltejs/kit'
import 'dotenv/config'

export const GET: RequestHandler = async () => {
  const rcon_proxy_server = process.env.RCON_WEBSOCKET_PROXY ?? 'ws://localhost:8765'

  if (rcon_proxy_server) {
    return {
      status: 200,
      body: {rcon_proxy_server},
    }
  }

  throw new Error(`💩`)
}