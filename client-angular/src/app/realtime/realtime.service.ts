import { EVENTS_SUBJECT, SOCKET_SUBJECT } from '@/realtime/realtime.constants'
import { IdentityService } from '@/user/identity.service'
import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Socket, io } from 'socket.io-client'

@Injectable()
export class RealtimeService {
  constructor(
    private identitySvc: IdentityService,
    @Inject(SOCKET_SUBJECT) private socket$: BehaviorSubject<Socket | null>,
    @Inject(EVENTS_SUBJECT) private events$: Subject<Record<string, unknown>>
  ) {}

  private connectHelper() {
    return new Promise<Socket>((resolve, reject) => {
      const socket = io({
        autoConnect: false,
        path: '/api/socket.io',
        query: {
          userId: this.identitySvc.user!.id,
        },
      })

      socket.once('connect', () => {
        resolve(socket)
      })

      socket.once('connect_error', (error) => {
        reject(error)
      })

      socket.connect()
    })
  }

  async connect() {
    if (this.socket) {
      return
    }

    const socket = await this.connectHelper()
    this.socket$.next(socket)

    socket.on('message', (arg) => {
      this.events$.next(arg)
    })

    console.log('WS connected')

    return socket
  }

  getEvents$<T>() {
    return this.events$.asObservable() as Observable<T>
  }

  async disconnect() {
    if (!this.socket) {
      return
    }

    this.socket.disconnect()
    this.socket.offAny()

    this.socket$.next(null)
  }

  get socket() {
    return this.socket$.value
  }
}
