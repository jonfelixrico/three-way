import { IChatroom } from 'src/chatroom/chatroom.types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Chatroom implements IChatroom {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string
}
