import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { UserModule } from '@/user/user.module'
import { RealtimeService } from '@/realtime/realtime.service'

@NgModule({
  imports: [CommonModule, UserModule],
  providers: [RealtimeService],
})
export class RealtimeModule {}
