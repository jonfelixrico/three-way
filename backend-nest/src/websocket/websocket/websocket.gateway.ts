import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets'
import { Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway {
  @SubscribeMessage('connect')
  handleMessage(@ConnectedSocket() socket: Socket) {
    console.log(socket.id)
  }
}
