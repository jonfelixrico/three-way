import { Inject, Injectable } from '@angular/core'
import { AXIOS_PROVIDER } from '../axios/axios.constants'
import { Axios } from 'axios'
import { ChatMessage } from './chat-rest-api.types'

@Injectable()
export class MessageService {
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
