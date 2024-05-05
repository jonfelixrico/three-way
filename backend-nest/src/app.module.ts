import { Module } from '@nestjs/common'
import { DatasourceModule } from './datasource/datasource.module'
import { ChatRoomModule } from './chat-room/chat-room.module'
import { WebsocketModule } from './websocket/websocket.module'
import { EventBusModule } from './event-bus/event-bus.module'

@Module({
  imports: [DatasourceModule, ChatRoomModule, WebsocketModule, EventBusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
