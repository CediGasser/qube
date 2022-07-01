export default class RconConnection {
    private url: URL
    private password: string

    private socket!: WebSocket

    constructor(url: URL, password: string) {
        this.url = url
        this.password = password

        this.open()
    }

    public open() {
        let connectionString = `ws://${this.url}/${this.password}`
        this.socket = new WebSocket(connectionString)
    }

    public close() {
        this.socket.close(1000, 'User closed the connection')
    }

    public send(command: string) {
        console.log(command)
        // this.socket.send(command)
    }
}