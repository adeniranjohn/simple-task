import { Logger } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ITask } from 'src/tasks/interfaces/task.interface';
import { IUser } from 'src/users/interfaces/user.interface';

@WebSocketGateway()
export class StreamerGateway {
  private readonly logger = new Logger(StreamerGateway.name);

  @WebSocketServer() io: Server;

  afterInit() {
    this.logger.log('Started');
  }

  handleConnection(client: Socket) {
    const { sockets } = this.io.sockets;
    this.io.emit('Connect', `Cliend:${client.id} just connected`);
    this.io.emit(`Message`, `Number of connected clients: ${sockets.size}`);
  }

  handleDisconnect(client: Socket) {
    const { sockets } = this.io.sockets;
    this.io.emit('Disconnect', `Cliend:${client.id} just disconnected`);
    this.io.emit(`Message`, `Number of connected clients: ${sockets.size}`);
  }

  streamTask(client: Socket, task: ITask) {
    this.io.emit('Task', task);
  }

  streamUser(client: Socket, user: IUser) {
    this.io.emit('User', user);
  }

  streamMessage(client: Socket, message: string) {
    this.io.emit('Message', message);
  }
}
