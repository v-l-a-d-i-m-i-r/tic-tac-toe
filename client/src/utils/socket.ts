class Socket {
  private socket: WebSocket | null = null;

  constructor(private readonly url: string) {
    this.socket = null;
  }

  connect(): void {
    if (!this.socket) {
      this.socket = new WebSocket(this.url);
    }
  }

  disconnect(): void {
    if (this.socket && !this.socket.CLOSED) {
      this.socket.close();
      this.socket = null;
    }
  }

  send(message: unknown): void {
    if (this.socket && this.socket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  on<K extends keyof WebSocketEventMap>(eventName: string, callback: (e: WebSocketEventMap[K]) => void) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }
}

export const socket = new Socket('ws://localhost:3000');
