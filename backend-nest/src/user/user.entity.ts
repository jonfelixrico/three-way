import { Exclude, Expose } from 'class-transformer'
import { IUser } from 'src/user/user.types'
import { Column, Entity, Index, PrimaryColumn } from 'typeorm'

@Entity()
@Exclude()
export class User implements IUser {
  @Expose()
  @PrimaryColumn({
    type: 'uuid',
    generated: 'uuid',
  })
  id: string

  @Expose()
  @Column('varchar', {
    unique: true,
  })
  @Index()
  username: string

  @Column('text')
  encryptedPassword: string
}
