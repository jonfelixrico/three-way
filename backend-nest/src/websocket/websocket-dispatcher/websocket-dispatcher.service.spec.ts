import { Test, TestingModule } from '@nestjs/testing'
import { WebsocketDispatcherService } from './websocket-dispatcher.service'

describe('WebsocketDispatcherService', () => {
  let service: WebsocketDispatcherService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketDispatcherService],
    }).compile()

    service = module.get<WebsocketDispatcherService>(WebsocketDispatcherService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
