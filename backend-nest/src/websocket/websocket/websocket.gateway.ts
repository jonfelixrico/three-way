import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { parse } from 'qs'
import { Subject, filter, takeUntil } from 'rxjs'
import { EVENT_BUS, EventBus } from 'src/websocket/event-bus.provider'
import { Inject } from '@nestjs/common'

function getQuery(request: Socket['request']) {
  const idx = request.url!.indexOf('?')
  return parse(request.url!.slice(idx), {
    ignoreQueryPrefix: true,
  })
}

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection {
  constructor(@Inject(EVENT_BUS) private bus: EventBus) {}

  handleConnection(socket: Socket) {
    const { userId } = getQuery(socket.request)

    const disconnect$ = new Subject<boolean>()
    socket.once('disconnect', () => {
      disconnect$.next(true)
      disconnect$.complete()
    })

    this.bus
      .pipe(
        filter((value) => value.recipients.has(userId as string)),
        takeUntil(disconnect$)
      )
      .subscribe({
        next: ({ code, payload }) => {
          socket.send({
            [code]: payload,
          })
        },
        complete: () => {
          console.log('Completed due to disconnection %s', userId)
        },
      })
  }
}
