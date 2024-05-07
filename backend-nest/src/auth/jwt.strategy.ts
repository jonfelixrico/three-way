import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UserService } from 'src/user/user.service/user.service'
import { IUser } from 'src/user/user.types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userSvc: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // TODO extract from env var
      secretOrKey: 'test',
    })
  }

  async validate({ sub }: { sub: string }): Promise<IUser> {
    return await this.userSvc.getById(sub)
  }
}
