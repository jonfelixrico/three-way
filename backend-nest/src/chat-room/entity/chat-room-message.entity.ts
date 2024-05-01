import { ChatRoom } from './chat-room.entity'
import { IChatRoomMessage } from './chat-room-entity.types'
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

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
}
