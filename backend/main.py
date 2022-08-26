from mcrcon import MCRcon
import ssl
import asyncio
import websockets
import os

async def handler(websocket):
    split = websocket.path.split('/')

    [SERVER_ADDRESS, PORT] = split[1].split(':')
    PASSWORD = split[2]

    PORT = int(PORT)

    print(f"Connecting to {SERVER_ADDRESS}:{PORT} ...")

    rconCon = MCRcon(host=SERVER_ADDRESS, port=PORT, password=PASSWORD)
    rconCon.connect()

    async for command in websocket:
        res = rconCon.command(command)
        await websocket.send(res)


async def main():
    try:
        ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)

        letsencrypt_host = os.environ.get("LETSENCRYPT_HOST")

        # Cert files will be accessed in mounted docker volume, might change this path to an env var in the future
        ssl_cert = f"/app/certs/{letsencrypt_host}/fullchain.pem"
        ssl_key = f"/app/certs/{letsencrypt_host}/key.pem"

        ssl_context.load_cert_chain(ssl_cert, keyfile=ssl_key)

        print(f"Loaded cert chain from /app/certs/{letsencrypt_host}/, using TLS encryption.")

        async with websockets.serve(handler, "0.0.0.0", 8765, ssl=ssl_context):
            await asyncio.Future()  # run forever

    except:
        print("Could not load cert chain, using no encryption.")
        async with websockets.serve(handler, "0.0.0.0", 8765):
            await asyncio.Future()  # run forever


if __name__ == '__main__':
    asyncio.run(main())
