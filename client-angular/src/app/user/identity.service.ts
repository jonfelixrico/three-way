import { Inject, Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import { LOCAL_STORAGE } from '../localstorage.provider'
import { Store } from '@ngxs/store'
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs'
import { User } from '@/user/user.types'
import { UserActions } from '@/user/user.actions'

const USER_ID = 'CLIENT_ID'

@Injectable()
export class IdentityService {
  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage?: typeof window.localStorage
  ) {}

  async loadUser() {
    const { localStorage } = this

    // TODO explicitly check for browsermode instead
    if (!localStorage) {
      return
    }

    const token = localStorage.getItem('token')
    if (!token) {
      console.debug('No token found')
      return
    }

    const data = await firstValueFrom(this.http.get<User>('/api/user/@me'))
    // TODO handle cases where token is expired

    console.debug('Loaded user data for %s', data.id)

    this.store.dispatch(new UserActions.Set(data))
  }

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
