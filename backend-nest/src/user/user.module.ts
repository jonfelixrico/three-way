import { Module } from '@nestjs/common'
import { UserService } from './user.service/user.service'
import { UserController } from './user.controller/user.controller'
import { DatasourceModule } from 'src/datasource/datasource.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from 'src/user/user.entity'

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [DatasourceModule, TypeOrmModule.forFeature([User])],
})
export class UserModule {}
