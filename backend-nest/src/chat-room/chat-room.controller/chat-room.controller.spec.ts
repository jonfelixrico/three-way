import { createMock } from '@golevelup/ts-jest'
import { Test, TestingModule } from '@nestjs/testing'
import { ChatRoomController } from './chat-room.controller'
import { ChatRoomService } from 'src/chat-room/chat-room.service/chat-room.service'

describe('ChatRoomController', () => {
  let controller: ChatRoomController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChatRoomController],
      providers: [
        {
          provide: ChatRoomService,
          useValue: createMock<ChatRoomService>(),
        },
      ],
    }).compile()

    controller = module.get<ChatRoomController>(ChatRoomController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
