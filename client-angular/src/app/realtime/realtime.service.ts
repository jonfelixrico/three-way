import { IdentityService } from '@/user/identity.service'
import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject } from 'rxjs'
import { Socket, io } from 'socket.io-client'

@Injectable()
export class RealtimeService {
  readonly socket$ = new BehaviorSubject<Socket | null>(null)
  private readonly events$ = new Subject<Record<string, unknown>>()

  constructor(private identitySvc: IdentityService) {}

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
