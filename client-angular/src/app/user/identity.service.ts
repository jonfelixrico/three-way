import { Injectable } from '@angular/core'
import { randomUUID } from 'crypto'

const USER_ID = 'CLIENT_ID'

@Injectable()
export class IdentityService {
  constructor() {}

  getUserId() {
    let userId = localStorage.getItem(USER_ID)

    if (!userId) {
      userId = randomUUID()
      localStorage.setItem(USER_ID, userId)
    }

    return userId
  }
}
