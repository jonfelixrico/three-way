import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller/auth.controller'
import { UserModule } from 'src/user/user.module'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { LocalStrategy } from 'src/auth/local.strategy'
import { JwtStrategy } from 'src/auth/jwt.strategy'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { ConfigService } from '@nestjs/config'
import { JWT_SECRET } from 'src/env.constants'

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (cfg: ConfigService) => {
        return {
          secret: cfg.getOrThrow<string>(JWT_SECRET),
          signOptions: {
            expiresIn: '1h',
          },
        }
      },
      inject: [ConfigService],
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
