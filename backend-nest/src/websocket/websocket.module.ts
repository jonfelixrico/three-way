import { Module } from '@nestjs/common'
import { WebsocketGateway } from './websocket/websocket.gateway'
import { WebsocketDispatcherService } from './websocket-dispatcher/websocket-dispatcher.service'
import { provideEventBus } from 'src/websocket/event-bus.provider'

@Module({
  providers: [WebsocketGateway, WebsocketDispatcherService, provideEventBus()],
  exports: [WebsocketDispatcherService],
})
export class WebsocketModule {}
