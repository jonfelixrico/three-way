import { Component, OnInit } from '@angular/core'
import { ChatMessage } from '../chat-rest-api/chat-rest-api.types'
import { ActivatedRoute } from '@angular/router'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  messages: ChatMessage[] = []

  get serialized() {
    return JSON.stringify(this.messages)
  }

  private async getDataFromResolver() {
    const data = await firstValueFrom(this.activatedRoute.data)
    this.messages = data['messages']
  }

  ngOnInit(): void {
    this.getDataFromResolver()
  }
}
