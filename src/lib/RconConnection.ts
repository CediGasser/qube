export default class RconConnection {
	private url: URL;
	private password: string;

	private socket!: WebSocket;

	constructor(url: URL, password: string) {
		this.url = url;
		this.password = password;
	}

	public set onmessage(value: ((this: WebSocket, ev: MessageEvent<any>) => any) | null) {
		if (this.socket) {
			this.socket.onmessage = value;
		}
	}

	public set onopen(value: ((this: WebSocket, ev: Event) => any) | null) {
		if (this.socket) {
			this.socket.onopen = value;
		}
	}

	public set onclose(value: ((this: WebSocket, ev: CloseEvent) => any) | null) {
		if (this.socket) {
			this.socket.onclose = value;
		}
	}

	public set onerror(value: ((this: WebSocket, ev: Event) => any) | null) {
		if (this.socket) {
			this.socket.onerror = value;
		}
	}

	public open() {
		let connectionString = `ws://${this.url}/${this.password}`;
		this.socket = new WebSocket(connectionString);
	}

	public close() {
		this.socket.close(1000, 'User closed the connection');
	}

	public send(command: string) {
		this.socket.send(command);
	}
}
