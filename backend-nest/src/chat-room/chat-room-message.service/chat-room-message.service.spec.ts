import { Test, TestingModule } from '@nestjs/testing'
import { ChatRoomMessageService } from './chat-room-message.service'

describe('ChatRoomMessageService', () => {
  let service: ChatRoomMessageService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatRoomMessageService],
    }).compile()

    service = module.get<ChatRoomMessageService>(ChatRoomMessageService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
