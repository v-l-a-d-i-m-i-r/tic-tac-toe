import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway } from '@nestjs/websockets';
import { ClientOptions, WebSocket } from 'ws';
import { LoggerService } from '../logger/logger.service';

type Client = WebSocket & { id: string };

@WebSocketGateway()
export class WsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly clients: Client[] = [];

  public constructor(private readonly logger: LoggerService) {}

  public async handleConnection(client: Client, request: ClientOptions) {
    this.clients.push(client);
  }

  public handleDisconnect(client: Client) {
    this.logger.log('Cliend disconnected');
  }

  public send<T extends object>(message: T): void {
    this.clients.forEach(client => client.send(JSON.stringify(message)));
  }
}
