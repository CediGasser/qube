from mcrcon import MCRcon
import ssl
import asyncio
import websockets


async def echo(websocket):
    SERVER_ADDRESS = "80.219.60.64"
    PASSWORD = "Password"
    PORT = int(25571)

    rconConnection = Server(SERVER_ADDRESS, PORT, PASSWORD)
    rconConnection.open()
    async for command in websocket:
        res = rconConnection.send(command)
        await websocket.send(res)


async def main():
    async with websockets.serve(echo, "0.0.0.0", 8765):
        await asyncio.Future()  # run forever


class Server:
    def __init__(self, ip, port, pw):
        self.rcon_ip = ip
        self.rcon_pt = port
        self.rcon_pw = pw
        self.open()

    def open(self):
        self.rcon = MCRcon(host=self.rcon_ip, port=self.rcon_pt, password=self.rcon_pw)
        self.rcon.connect()
    
    def send(self, command):
        return self.rcon.command(command)

    def disconnect(self):
        self.rcon.disconnect()


if __name__ == '__main__':
    asyncio.run(main())
