import { Test, TestingModule } from '@nestjs/testing'
import { ChatRoomService } from './chat-room.service'
import {
  CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
  CHAT_ROOM_REPOSITORY_PROVIDER,
} from 'src/chat-room/chat-room.constants'
import { createMock } from '@golevelup/ts-jest'
import { Repository } from 'typeorm'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'

describe('ChatRoomService', () => {
  let service: ChatRoomService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatRoomService,
        {
          provide: CHAT_ROOM_MESSAGE_REPOSITORY_PROVIDER,
          useValue: createMock<Repository<ChatRoomMessage>>(),
        },
        {
          provide: CHAT_ROOM_REPOSITORY_PROVIDER,
          useValue: createMock<Repository<ChatRoom>>(),
        },
      ],
    }).compile()

    service = module.get<ChatRoomService>(ChatRoomService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
