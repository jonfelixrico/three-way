import { Module } from '@nestjs/common'
import { DatasourceModule } from './datasource/datasource.module'
import { ChatRoomModule } from './chatroom/chat-room.module'

@Module({
  imports: [DatasourceModule, ChatRoomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
