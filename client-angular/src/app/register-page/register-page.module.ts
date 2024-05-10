import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegisterPageRoutingModule } from './register-page-routing.module'
import { RegisterPageComponent } from './register-page.component'
import { InputTextModule } from 'primeng/inputtext'
import { PasswordModule } from 'primeng/password'

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    InputTextModule,
    PasswordModule,
  ],
})
export class RegisterPageModule {}
