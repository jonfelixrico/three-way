import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  handleConnection(socket: Socket) {
    console.log(socket.id)
  }
}
