import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { LocalAuthGuard } from 'src/auth/local-auth.guard'
import { IUser } from 'src/user/user.types'

@Controller('auth')
export class AuthController {
  constructor(private jwt: JwtService) {}

  @UseGuards(LocalAuthGuard)
  @Post()
  async authenticate(@Request() req: { user: IUser }) {
    const { id } = req.user
    const token = await this.jwt.signAsync({
      sub: id,
    })

    return {
      accessToken: token,
    }
  }
}
