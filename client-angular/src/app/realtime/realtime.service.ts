import { IdentityService } from '@/user/identity.service'
import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { Socket, io } from 'socket.io-client'

@Injectable()
export class RealtimeService {
  private readonly socket$ = new BehaviorSubject<Socket | null>(null)

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

    return socket
  }

  get socket() {
    return this.socket$.value
  }
}
