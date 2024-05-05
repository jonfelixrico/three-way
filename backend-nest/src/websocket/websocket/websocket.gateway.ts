import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { parse } from 'qs'

function getQuery(request: Socket['request']) {
  const idx = request.url!.indexOf('?')
  return parse(request.url!.slice(idx), {
    ignoreQueryPrefix: true,
  })
}

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  handleConnection(socket: Socket) {
    const { userId } = getQuery(socket.request)
    console.log(userId)
  }
}
