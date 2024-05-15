import { IChatRoomMember } from 'src/chat-room/chat-room.types'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { User } from 'src/user/user.entity'
import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'

@Entity()
export class ChatRoomMember implements IChatRoomMember {
  /*
   * This entity is quite special since it uses a composite PK that uses FKs
   * See https://stackoverflow.com/a/72764767 for the reference.
   */

  @PrimaryColumn()
  chatId: string

  @PrimaryColumn()
  userId: string

  @ManyToOne(() => ChatRoom, {
    eager: true,
  })
  chat: ChatRoom

  @ManyToOne(() => User, { eager: true })
  user: User

  @Column()
  isOwner: boolean
}
