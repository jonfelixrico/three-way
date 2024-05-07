import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { UserService } from 'src/user/user.service/user.service'
import { IUser } from 'src/user/user.types'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userSvc: UserService) {
    super()
  }

  async validate(username: string, password: string): Promise<IUser> {
    const validated = this.userSvc.verifyCredentials(username, password)

    if (!validated) {
      throw new UnauthorizedException()
    }

    return validated
  }
}
