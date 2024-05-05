import { Module } from '@nestjs/common'
import { DatasourceModule } from './datasource/datasource.module'
import { ChatRoomModule } from './chat-room/chat-room.module'
import { WebsocketModule } from './websocket/websocket.module'

@Module({
  imports: [DatasourceModule, ChatRoomModule, WebsocketModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
