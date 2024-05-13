import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { JWT_SECRET } from 'src/env.constants'
import { UserService } from 'src/user/user.service/user.service'
import { IUser } from 'src/user/user.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userSvc: UserService,
    configSvc: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configSvc.getOrThrow<string>(JWT_SECRET),
    })
  }

  async validate({ sub }: { sub: string }): Promise<IUser> {
    return await this.userSvc.getById(sub)
  }
}
