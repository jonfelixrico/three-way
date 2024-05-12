import { TranslocoModule } from '@jsverse/transloco'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { InputTextModule } from 'primeng/inputtext'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'

import { LoginPageRoutingModule } from './login-page-routing.module'
import { LoginPageComponent } from './login-page.component'
import { UserModule } from '@/user/user.module'
import { CardModule } from 'primeng/card'

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginPageRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    UserModule,
    CardModule,
    TranslocoModule,
  ],
})
export class LoginPageModule {}
