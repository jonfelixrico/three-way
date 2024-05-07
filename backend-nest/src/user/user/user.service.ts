import { Inject, Injectable } from '@nestjs/common'
import { USER_DB } from 'src/user/user-db.providers'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'
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
      encryptedPassword: await bcrypt.hash(password, SALT_ROUNDS),
      username,
    })

    return user
  }

  async verifyCredentials(username: string, password: string) {
    const fromDb = await this.userDb.findOne({
      where: {
        username,
      },
    })

    if (!fromDb) {
      throw new Error('not found')
    }

    return await bcrypt.compare(password, fromDb.encryptedPassword)
  }

  async getByUsername(username: string): Promise<IUser> {
    return await this.userDb.findOne({
      where: {
        username,
      },
    })
  }
}
