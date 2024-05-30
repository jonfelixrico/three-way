import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IdentityService } from './identity.service'
import { UserService } from '@/user/user.service'

@NgModule({
  providers: [IdentityService, UserService],
  imports: [CommonModule],
})
export class UserModule {}
