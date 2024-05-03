import { Component, OnInit } from '@angular/core'
import { ChatMessage } from '../chat-rest-api/chat-rest-api.types'
import { ActivatedRoute } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import { IdentityService } from '../user/identity.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
})
export class ChatComponent implements OnInit {
  readonly userId: string

  constructor(
    private activatedRoute: ActivatedRoute,
    identitySvc: IdentityService
  ) {
    this.userId = identitySvc.getUserId()
  }

  messages: ChatMessage[] = []

  private async getDataFromResolver() {
    const data = await firstValueFrom(this.activatedRoute.data)
    this.messages = data['messages']
  }

  ngOnInit(): void {
    this.getDataFromResolver()
  }
}
