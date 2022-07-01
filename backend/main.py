from mcrcon import MCRcon

class Server():
    def __init__(self, ip, pw):
        self.rcon_ip = ip
        self.rcon_pw = pw

    def open(self):
        # create rcon connection and store in self.connection
        self.connection = MCRcon(self.rcon_ip, self.rcon_pw).open()

if __name__ == '__main__':
    Server("46.126.69.5", "password123")