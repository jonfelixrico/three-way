import { IdentityService } from '@/user/identity.service'
import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http'
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import forEach from 'lodash/forEach'
import { DialogService } from 'primeng/dynamicdialog'
import { TextDialogContentComponent } from '@/common-components/text-dialog-content/text-dialog-content.component'
import { TranslocoService } from '@jsverse/transloco'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private identitySvc: IdentityService,
    private dialogSvc: DialogService,
    private tl: TranslocoService
  ) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  })

  async submit() {
    const { form } = this
    if (!form.valid) {
      forEach(form.controls, (control) => control.markAsDirty())
      return
    }

    try {
      const { accessToken } = await lastValueFrom(
        this.http.post<{ accessToken: string }>('/api/auth', form.value)
      )

      this.identitySvc.setAccessToken(accessToken)

      await this.router.navigateByUrl('/app')
    } catch (e) {
      const isWrongCredentials =
        e instanceof HttpErrorResponse &&
        e.status === HttpStatusCode.Unauthorized

      console.log(e)

      this.dialogSvc.open(TextDialogContentComponent, {
        header: this.tl.translate('auth.logInError.title'),
        data: {
          text: this.tl.translate(
            isWrongCredentials
              ? 'auth.logInError.wrongCredentials'
              : 'common.genericError'
          ),
        },
      })

      this.form.reset({
        username: this.form.get('username')?.value,
      })
    }
  }
}
