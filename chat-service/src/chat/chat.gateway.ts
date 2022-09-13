import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import randomLogin from '../utils/getNickname';

@WebSocketGateway({ cors: '*:*' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(ChatGateway.name);
  private connected = new Map<string, string>();

  @WebSocketServer() server;

  handleConnection(client: Socket) {
    const name = randomLogin();
    this.connected.set(client.id, name);

    client.emit('message', {
      msg: `Welcome to chat, ${name}`,
      currUserId: name,
    });
    client.emit('activeUsers', Array.from(this.connected.values()));
    client.broadcast.emit('message', { msg: `${name} connected to chat` });
    client.broadcast.emit('userConnected', name);

    this.logger.log(`${name} connected`);
  }
  handleDisconnect(client: Socket) {
    const name = this.connected.get(client.id);

    client.broadcast.emit('message', { msg: `${name} disconnected` });
    client.broadcast.emit('userDisconnected', name);
    this.logger.log(`${name} disconnected`);
    this.connected.delete(client.id);
  }
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string) {
    const name = this.connected.get(client.id);

    this.server.emit('message', { msg: payload, user: name, time: new Date() });
    // return 'Hello the whole world!';
  }
}
