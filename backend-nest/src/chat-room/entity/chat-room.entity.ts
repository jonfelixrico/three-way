import { IChatRoom } from './chat-room-entity.types'
import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class ChatRoom implements IChatRoom {
  @PrimaryColumn({
    type: 'varchar',
    generated: 'uuid',
  })
  id: string

  @Column('varchar')
  name: string
}
