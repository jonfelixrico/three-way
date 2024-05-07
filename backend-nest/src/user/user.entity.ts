import { IUser } from 'src/user/user.types'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
export class User implements IUser {
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string

  @Column('varchar')
  @Index()
  username: string

  @Column('text')
  encryptedPassword: string
}
