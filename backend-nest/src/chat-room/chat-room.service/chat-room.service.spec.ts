import { Test, TestingModule } from '@nestjs/testing'
import { ChatRoomService } from './chat-room.service'
import { createMock } from '@golevelup/ts-jest'
import { Repository } from 'typeorm'
import { ChatRoomMessage } from 'src/chat-room/entity/chat-room-message.entity'
import { ChatRoom } from 'src/chat-room/entity/chat-room.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('ChatRoomService', () => {
  let service: ChatRoomService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChatRoomService,
        {
          provide: getRepositoryToken(ChatRoomMessage),
          useValue: createMock<Repository<ChatRoomMessage>>(),
        },
        {
          provide: getRepositoryToken(ChatRoom),
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
