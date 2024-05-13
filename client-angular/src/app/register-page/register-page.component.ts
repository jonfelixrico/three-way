import {
  HttpClient,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http'
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'
import { DialogService } from 'primeng/dynamicdialog'
import { TextDialogContentComponent } from '@/common-components/text-dialog-content/text-dialog-content.component'
import { TranslocoService } from '@jsverse/transloco'
import { UsernameAsyncValidator } from '@/register-page/username.async-validator'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  form: FormGroup

  constructor(
    private http: HttpClient,
    private router: Router,
    private dialogSvc: DialogService,
    private tl: TranslocoService,
    usernameValidator: UsernameAsyncValidator
  ) {
    this.form = new FormGroup(
      {
        // TODO implement username check
        username: new FormControl('', {
          validators: [Validators.required],
          asyncValidators: [usernameValidator.validate.bind(usernameValidator)],
        }),

        password: new FormControl('', [Validators.required]),
        passwordConfirm: new FormControl('', [Validators.required]),
      },
      {
        validators: [
          /**
           * "Confirm password" validation
           */
          (formGroup) => {
            const password = formGroup.get('password')!
            const passwordConfirm = formGroup.get('passwordConfirm')!

            if (password.value !== passwordConfirm.value) {
              passwordConfirm.setErrors({
                ...passwordConfirm.errors,
                mustMatch: true,
              })
            } else {
              const errors = omit(passwordConfirm.errors, 'mustMatch')
              passwordConfirm.setErrors(isEmpty(errors) ? null : errors)
            }

            return null
          },
        ],
      }
    )
  }

  get username() {
    return this.form.get('username')!
  }

  async submit() {
    const { form } = this

    if (!form.valid) {
      forEach(form.controls, (control) => control.markAsDirty())
      return
    }

    const { password, username } = form.value
    try {
      await firstValueFrom(
        this.http.post('/api/register', {
          username,
          password,
        })
      )

      await this.router.navigateByUrl('/login')
    } catch (e) {
      console.log(e)

      let errorMessage = this.tl.translate('common.genericError')
      if (
        e instanceof HttpErrorResponse &&
        e.status === HttpStatusCode.Conflict
      ) {
        errorMessage = this.tl.translate('auth.registerError.usernameTaken', {
          username,
        })
      }

      this.dialogSvc.open(TextDialogContentComponent, {
        header: this.tl.translate('auth.registerError.title'),
        data: {
          text: errorMessage,
        },
      })

      this.form.reset()
    }
  }
}
