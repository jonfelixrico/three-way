import { Inject, Injectable } from '@angular/core'
import { Axios } from 'axios'
import { AXIOS_PROVIDER } from '../../axios/axios.constants'

export interface ChatMessage {
  content: string
  chatRoomId: string
  id: string
  timestamp: Date
}

@Injectable({
  providedIn: 'root',
})
export class ChatHttpApiService {
  constructor(
    @Inject(AXIOS_PROVIDER)
    private axios: Axios
  ) {}

  async getMessages(chatId: string) {
    const { data } = await this.axios.get<ChatMessage[]>(
      `/chat/${chatId}/message`
    )

    return data
  }
}
