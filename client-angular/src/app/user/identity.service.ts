import { Inject, Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import { LOCAL_STORAGE } from '../localstorage.provider'

const USER_ID = 'CLIENT_ID'

@Injectable()
export class IdentityService {
  constructor(
    @Inject(LOCAL_STORAGE) private localStorage?: typeof window.localStorage
  ) {}

  getUserId() {
    if (!this.localStorage) {
      return 'SERVER'
    }

    let userId = this.localStorage.getItem(USER_ID)

    if (!userId) {
      userId = uuidv4()
      this.localStorage.setItem(USER_ID, userId)
    }

    return userId
  }
}
