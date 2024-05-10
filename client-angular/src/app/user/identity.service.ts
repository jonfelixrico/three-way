import { Inject, Injectable } from '@angular/core'
import { v4 as uuidv4 } from 'uuid'
import { LOCAL_STORAGE } from '../localstorage.provider'
import { Select, Store } from '@ngxs/store'
import { HttpClient } from '@angular/common/http'
import { Observable, firstValueFrom } from 'rxjs'
import { User } from '@/user/user.types'
import { UserActions } from '@/user/user.actions'
import { UserSliceModel } from '@/user/user.slice'

const USER_ID = 'CLIENT_ID'

@Injectable()
export class IdentityService {
  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage?: typeof window.localStorage
  ) {}

  @Select() user$!: Observable<UserSliceModel>

  setAccessToken(token: string) {
    const { localStorage } = this

    if (!localStorage) {
      return
    }

    localStorage.setItem('token', token)
  }

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

  async hasUser() {
    const user = await firstValueFrom(this.user$)
    return !!user.user
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
