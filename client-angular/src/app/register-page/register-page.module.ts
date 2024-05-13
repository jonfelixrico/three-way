import { TranslocoModule } from '@jsverse/transloco'
import { NgModule } from '@angular/core'
import { CommonModule, NgIf } from '@angular/common'

import { RegisterPageRoutingModule } from './register-page-routing.module'
import { RegisterPageComponent } from './register-page.component'
import { InputTextModule } from 'primeng/inputtext'
import { ReactiveFormsModule } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { CardModule } from 'primeng/card'
import { InputSubtextComponent } from '@/common-components/input-help-text/input-subtext.component'
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog'
import { TextDialogContentComponent } from '@/common-components/text-dialog-content/text-dialog-content.component'
import { UsernameAsyncValidator } from '@/register-page/username.async-validator'
import { IconFieldModule } from 'primeng/iconfield'
import { InputIconModule } from 'primeng/inputicon'

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
    InputSubtextComponent,
    DynamicDialogModule,
    TextDialogContentComponent,
    IconFieldModule,
    InputIconModule,
    NgIf,
  ],
  providers: [DialogService, UsernameAsyncValidator],
})
export class RegisterPageModule {}
