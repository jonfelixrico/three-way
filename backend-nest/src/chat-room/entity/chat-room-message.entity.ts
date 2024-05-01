import { ChatRoom } from './chat-room.entity'
import { IChatRoomMessage } from './chat-room-entity.types'
import { Column, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export class ChatRoomMessage implements IChatRoomMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => ChatRoom)
  chatRoom: ChatRoom

  get chatRoomId() {
    return this.chatRoom.id
  }

  @Column('text')
  content: string

  @Index() // chat messages are typically presented as sorted by send timestamps, so we have to index this to keep queries fast
  @Column('time with time zone')
  timestamp: Date
}
