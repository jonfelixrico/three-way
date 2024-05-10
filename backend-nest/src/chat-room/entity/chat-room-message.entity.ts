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
import { Exclude, Expose } from 'class-transformer'

@Entity()
@Exclude()
export class ChatRoomMessage implements IChatRoomMessage {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  id: string

  @ManyToOne(() => ChatRoom, {
    eager: true,
  })
  chatRoom: ChatRoom

  @Expose()
  get chatRoomId() {
    return this.chatRoom.id
  }

  @Column('text')
  @Expose()
  content: string

  // chat messages are typically presented as sorted by send timestamps, so we have to index this to keep queries fast
  @Index()
  @Column('datetime')
  @Expose()
  timestamp: Date

  @ManyToOne(() => User, { eager: true })
  sender: User

  @Expose()
  get senderId() {
    return this.sender.id
  }
}
