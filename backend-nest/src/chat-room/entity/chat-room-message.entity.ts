import { ChatRoom } from './chat-room.entity'
import { IChatRoomMessage } from 'src/chat-room/chat-room.types'
import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'

export class ChatRoomMessage implements IChatRoomMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(() => ChatRoom)
  private chatRoom: ChatRoom

  get chatRoomId() {
    return this.chatRoom.id
  }

  @Column('text')
  content: string
}
