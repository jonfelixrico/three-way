import { IChatRoomMember } from 'src/chat-room/chat-room.types'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class ChatRoomMember implements IChatRoomMember {
  @ManyToOne(() => ChatRoom)
  @JoinColumn({ name: 'chatId' })
  @PrimaryColumn({ name: 'chatId', type: 'varchar' })
  chat: ChatRoom

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  @PrimaryColumn({ name: 'userId', type: 'varchar' })
  user: User

  get chatId() {
    return this.chat.id
  }

  get userId() {
    return this.user.id
  }

  @Column()
  isOwner: boolean
}
