import { IChatRoom } from '../chat-room.types'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ChatRoom implements IChatRoom {
  // TODO change this to PrimaryGeneratedColumn once we're not setting the id manually for some cases
  @PrimaryColumn({
    type: 'varchar',
    generated: 'uuid',
  })
  id: string

  @Column('varchar')
  name: string
}
