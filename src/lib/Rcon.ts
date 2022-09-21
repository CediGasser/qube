import { writable, type Writable } from "svelte/store";

// function createRconStore() as class
class RconStore {
    private messages: Writable<string[]>;
    private ws: WebSocket | null = null;
    private serverURL: URL | null = null;
    private password: string | null = null;
    private proxyURL: URL | null = null;
    // private retried = false;

    public get subscribe() {
        return this.messages.subscribe;
    }

    constructor() {
        this.messages = writable([]);
        this.ws = null;
        this.serverURL = null;
        this.password = null;
        this.proxyURL = null;
    }

    public connect(serverURL: URL | string, password: string, proxyURL: URL | string) {
        if (this.ws) {
            this.ws.close();
        }
        this.serverURL = serverURL instanceof URL ? serverURL : new URL(serverURL);
        this.password = password;
        proxyURL = proxyURL ?? new URL('ws://localhost:8765');
        this.proxyURL = proxyURL instanceof URL ? proxyURL : new URL(proxyURL);

        this.ws = new WebSocket(`${this.proxyURL}${this.serverURL}/${this.password}`);
        this.ws.onopen = (): void => {
            this.messages.update((messages) => {
                messages = [...messages, `Connected to: ${this.serverURL?.toString()}`];
                return messages;
            });
        };
        this.ws.onclose = (event: CloseEvent): void => {
            this.messages.update((messages) => {
                messages = [...messages, `Connection closed: ${event.reason}`];
                return messages;
            });
            this.ws = null;
        };
        this.ws.onerror = (event: Event): void => {
            this.messages.update((messages) => {
                messages = [...messages, `Connection error: ${event.type}`];
                return messages;
            });
            this.ws = null;
        };
        this.ws.onmessage = (event): void => {
            this.messages.update((messages) => {
                messages = [...messages, event.data];
                return messages;
            });
        };
    }

    public close(): void {
        if (this.ws) {
            this.messages.update((messages) => {
                messages = [...messages, "Closing connection..."];
                return messages;
            });
            this.ws.close(1000, 'User closed the connection');
            this.ws = null;
        }
    }

    public send(command: string): void {
        if (this.ws) {
            this.ws.send(command);
            this.messages.update((messages) => {
                messages = [...messages, command];
                return messages;
            });
        } // else { // try to reconnect, otherhiwse log error
        //     if (this.serverURL && this.password && this.proxyURL) {
        //         this.retried = true;
        //         this.connect(this.serverURL, this.password, this.proxyURL);
        //         this.send(command);
        //     } else {
        //         console.log('No connection to send command');
        //     }
        // }
    }
}

export const rcon = new RconStore();