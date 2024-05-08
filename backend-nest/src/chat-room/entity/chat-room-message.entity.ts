import { ChatRoom } from './chat-room.entity'
import { IChatRoomMessage } from '../chat-room.types'
import {
  Column,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { User } from 'src/user/user.entity'

@Entity()
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

  // chat messages are typically presented as sorted by send timestamps, so we have to index this to keep queries fast
  @Index()
  @Column('datetime')
  timestamp: Date

  @ManyToOne(() => User)
  sender: User

  get senderId() {
    return this.sender.id
  }
}
