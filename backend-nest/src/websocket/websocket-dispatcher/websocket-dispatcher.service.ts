import { Inject, Injectable } from '@nestjs/common'
import { EVENT_BUS, Event, EventBus } from 'src/websocket/event-bus.provider'

@Injectable()
export class WebsocketDispatcherService {
  constructor(@Inject(EVENT_BUS) private bus: EventBus) {}

  dispatch<T>(code: string, payload: T, filter: Event<unknown>['filter']) {
    this.bus.next({
      code,
      payload,
      filter,
    })
  }
}
