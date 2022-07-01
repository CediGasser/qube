from mcrcon import MCRcon
import ssl
import asyncio
import websockets


async def echo(websocket):
    async for command in websocket:
        await websocket.send(command)
        SERVER_ADDRESS = ("80.219.60.64")
        PASSWORD = "Password"

        Server(SERVER_ADDRESS, PASSWORD, command)


async def main():
    async with websockets.serve(echo, "localhost", 8001):
        await asyncio.Future()  # run forever


class Server:
    def __init__(self, ip, pw, command):
        self.rcon_ip = ip
        self.rcon_pw = pw
        self.rcon_cd = command
        self.rcon_pt = int(25571)
        self.open()

    def open(self):
        with MCRcon(host=self.rcon_ip, port=self.rcon_pt, password=self.rcon_pw) as mcr:
            mcr.connect()
            resp = mcr.command(self.rcon_cd)
            print(resp)
            mcr.disconnect()


if __name__ == '__main__':
    asyncio.run(main())
