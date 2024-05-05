import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RealtimeService } from '@/realtime/realtime.service'
import { UserModule } from '@/user/user.module'

@NgModule({
  declarations: [],
  imports: [CommonModule, UserModule],
  providers: [RealtimeService],
})
export class RealtimeModule {}
