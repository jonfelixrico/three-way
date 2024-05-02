import { TestBed } from '@angular/core/testing'

import { ChatHttpApiService } from './chat-http-api.service'

describe('ChatHttpApiService', () => {
  let service: ChatHttpApiService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(ChatHttpApiService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
})
