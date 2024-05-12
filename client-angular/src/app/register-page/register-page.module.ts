import { TranslocoModule } from '@jsverse/transloco'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegisterPageRoutingModule } from './register-page-routing.module'
import { RegisterPageComponent } from './register-page.component'
import { InputTextModule } from 'primeng/inputtext'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'

@NgModule({
  declarations: [RegisterPageComponent],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    TranslocoModule,
  ],
})
export class RegisterPageModule {}
