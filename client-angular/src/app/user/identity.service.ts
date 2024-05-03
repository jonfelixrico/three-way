import { Injectable } from '@angular/core'
import { randomUUID } from 'crypto'

const CLIENT_ID = 'CLIENT_ID'

@Injectable()
export class IdentityService {
  constructor() {}

  getUserId() {
    let clientId = localStorage.getItem(CLIENT_ID)

    if (!clientId) {
      clientId = randomUUID()
      localStorage.setItem(CLIENT_ID, clientId)
    }

    return clientId
  }
}
