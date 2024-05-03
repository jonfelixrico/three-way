import { Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'

const USER_ID = 'CLIENT_ID'

@Injectable()
export class IdentityService {
  constructor() {}

  getUserId() {
    let userId = localStorage.getItem(USER_ID)

    if (!userId) {
      userId = uuidv4()
      localStorage.setItem(USER_ID, userId)
    }

    return userId
  }
}
