import { Inject, Injectable } from '@nestjs/common'
import { EVENT_BUS, EventBus } from 'src/websocket/event-bus.provider'

@Injectable()
export class WebsocketDispatcherService {
  constructor(@Inject(EVENT_BUS) private bus: EventBus) {}

  dispatch<T>(code: string, payload: T, recipients: Set<string>) {
    this.bus.next({
      code,
      payload,
      recipients,
    })
  }
}
