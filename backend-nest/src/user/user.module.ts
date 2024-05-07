import { Module } from '@nestjs/common'
import { UserService } from './user.service/user.service'
import { provideUserDb } from 'src/user/user-db.providers'
import { UserController } from './user.controller/user.controller'
import { DatasourceModule } from 'src/datasource/datasource.module'

@Module({
  providers: [UserService, provideUserDb()],
  controllers: [UserController],
  exports: [UserService],
  imports: [DatasourceModule],
})
export class UserModule {}
