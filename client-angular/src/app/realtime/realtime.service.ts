import { IdentityService } from '@/user/identity.service'
import { Injectable } from '@angular/core'
import { Socket, io } from 'socket.io-client'

@Injectable()
export class RealtimeService {
  _socket: Socket | null = null

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
    if (!this._socket) {
      this._socket = await this.connectHelper()
    }

    return this._socket
  }

  get socket() {
    return this._socket
  }
}
