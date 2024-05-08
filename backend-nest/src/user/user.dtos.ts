import { IUser } from 'src/user/user.types'

// eslint-disable-next-line @typescript-eslint/no-namespace
export class UserRespDto implements IUser {
  id: string
  username: string
}

export class CredentialsReqDto {
  username: string
  password: string
}
