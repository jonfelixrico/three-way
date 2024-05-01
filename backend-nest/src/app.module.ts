import { Module } from '@nestjs/common'
import { DatasourceModule } from './datasource/datasource.module'
import { ChatroomModule } from './chatroom/chatroom.module'

@Module({
  imports: [DatasourceModule, ChatroomModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
