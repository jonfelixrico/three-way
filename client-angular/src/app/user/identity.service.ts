import { Inject, Injectable, Signal } from '@angular/core'
import { LOCAL_STORAGE } from '@/localstorage.provider'
import { Select, Store } from '@ngxs/store'
import { HttpClient } from '@angular/common/http'
import { Observable, firstValueFrom, map } from 'rxjs'
import { User } from '@/user/user.types'
import { UserActions } from '@/user/user.actions'
import { UserSliceModel } from '@/user/user.slice'
import { toSignal } from '@angular/core/rxjs-interop'

@Injectable()
export class IdentityService {
  @Select() user$!: Observable<UserSliceModel>

  private userIdSignal: Signal<string | undefined>

  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject(LOCAL_STORAGE) private localStorage?: typeof window.localStorage
  ) {
    this.userIdSignal = toSignal(
      this.user$.pipe(map((userState) => userState.user?.id))
    )
  }

  setAccessToken(token: string) {
    return this.localStorage?.setItem('token', token)
  }

  getAccessToken() {
    return this.localStorage?.getItem('token')
  }

  async loadUser() {
    const token = this.getAccessToken()
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
    return this.userIdSignal()
  }
}
