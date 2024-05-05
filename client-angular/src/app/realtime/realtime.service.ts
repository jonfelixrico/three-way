import { Injectable } from '@angular/core'
import { Socket, io } from 'socket.io-client'

function doConnect() {
  return new Promise<Socket>((resolve, reject) => {
    const socket = io({
      autoConnect: false,
      path: '/api/socket.io',
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

@Injectable()
export class RealtimeService {
  socket: Socket | null = null

  async connect() {
    if (!this.socket) {
      this.socket = await doConnect()
    }

    return this.socket
  }
}
