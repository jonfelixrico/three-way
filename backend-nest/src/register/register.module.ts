import { Module } from '@nestjs/common'
import { RegisterController } from './register.controller/register.controller'
import { UserModule } from 'src/user/user.module'

@Module({
  controllers: [RegisterController],
  providers: [UserModule],
})
export class RegisterModule {}
