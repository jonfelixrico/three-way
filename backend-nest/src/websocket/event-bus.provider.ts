import { Provider } from '@nestjs/common'
import { Subject } from 'rxjs'

export interface Event<Payload> {
  payload: Payload
  code: string
  recipients: Set<string>
}

export type EventBus = Subject<Event<unknown>>

export const EVENT_BUS = 'EVENT_BUS'

export function provideEventBus(): Provider {
  return {
    provide: EVENT_BUS,
    useValue: new Subject<Event<unknown>>(),
  }
}
