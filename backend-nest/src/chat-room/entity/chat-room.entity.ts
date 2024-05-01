import { IChatRoom } from 'src/chat-room/chat-room.types'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class ChatRoom implements IChatRoom {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  name: string
}
