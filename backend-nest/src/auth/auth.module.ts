import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller/auth.controller'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      // TODO take secrets form env
      secret: 'test',
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
