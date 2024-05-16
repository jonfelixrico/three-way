import { ModuleWithProviders, NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserModule } from '@/user/user.module'
import { RealtimeService } from '@/realtime/realtime.service'
import { EVENTS_SUBJECT, SOCKET_SUBJECT } from '@/realtime/realtime.constants'
import { BehaviorSubject, Subject } from 'rxjs'
import type { Socket } from 'socket.io-client'

@NgModule({
  imports: [CommonModule, UserModule],
  providers: [RealtimeService],
})
export class RealtimeModule {
  static forRoot(): ModuleWithProviders<RealtimeModule> {
    return {
      ngModule: RealtimeModule,
      providers: [
        {
          provide: SOCKET_SUBJECT,
          useValue: new BehaviorSubject<null | Socket>(null),
        },
        {
          provide: EVENTS_SUBJECT,
          useValue: new Subject<Record<string, unknown>>(),
        },
      ],
    }
  }
}
