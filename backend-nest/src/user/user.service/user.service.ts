import { Inject, Injectable } from '@nestjs/common'
import { USER_DB } from 'src/user/user-db.providers'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { hash, compare } from 'bcrypt'
import { IUser } from 'src/user/user.types'

const SALT_ROUNDS = 10

@Injectable()
export class UserService {
  constructor(@Inject(USER_DB) private userDb: Repository<User>) {}

  async create({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<IUser> {
    const user = await this.userDb.save({
      encryptedPassword: await hash(password, SALT_ROUNDS),
      username,
    })

    return user
  }

  async verifyCredentials(username: string, password: string): Promise<IUser> {
    const fromDb = await this.userDb.findOne({
      where: {
        username,
      },
    })

    if (!fromDb) {
      return null
    }

    const hasAMatch = await compare(password, fromDb.encryptedPassword)
    if (!hasAMatch) {
      return null
    }

    return fromDb
  }

  async getById(id: string): Promise<IUser> {
    return await this.userDb.findOne({
      where: {
        id,
      },
    })
  }
}
