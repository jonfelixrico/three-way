import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller/auth.controller'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from 'src/auth/local.strategy'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

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
  providers: [
    LocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
    {
      provide: APP_GUARD,
      useExisting: JwtAuthGuard,
    },
  ],
})
export class AuthModule {}
