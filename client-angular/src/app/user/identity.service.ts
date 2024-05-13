import { Inject, Injectable, Signal } from '@angular/core'
import { LOCAL_STORAGE } from '@/localstorage.provider'
import { Select, Store } from '@ngxs/store'
import { HttpClient } from '@angular/common/http'
import { Observable, firstValueFrom, map } from 'rxjs'
import { User } from '@/user/user.types'
import { UserActions } from '@/user/user.actions'
import { UserSliceModel } from '@/user/user.slice'
import { toSignal } from '@angular/core/rxjs-interop'
import { PlatformService } from '@/platform.service'

@Injectable()
export class IdentityService {
  @Select() user$!: Observable<UserSliceModel>

  private userSignal: Signal<User | undefined>

  constructor(
    private store: Store,
    private http: HttpClient,
    private platformSvc: PlatformService,
    @Inject(LOCAL_STORAGE) private localStorage?: typeof window.localStorage
  ) {
    this.userSignal = toSignal(
      this.user$.pipe(map((state) => state.user ?? undefined))
    )
  }

  clearAccessToken() {
    return this.localStorage?.removeItem('token')
  }

  setAccessToken(token: string) {
    return this.localStorage?.setItem('token', token)
  }

  getAccessToken() {
    return this.localStorage?.getItem('token')
  }

  async loadUser() {
    if (!this.platformSvc.isBrowser) {
      return
    }

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

  get user() {
    return this.userSignal()
  }

  getUserId() {
    return this.user?.id
  }
}
