import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { IdentityService } from './identity.service'

@NgModule({
  providers: [IdentityService],
  imports: [CommonModule],
})
export class UserModule {}
