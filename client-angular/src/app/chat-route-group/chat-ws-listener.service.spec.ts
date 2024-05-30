import { TestBed } from '@angular/core/testing'

import { ChatWsListenerService } from './chat-ws-listener.service'

describe('ChatWsListenerService', () => {
  let service: ChatWsListenerService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ChatWsListenerService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
