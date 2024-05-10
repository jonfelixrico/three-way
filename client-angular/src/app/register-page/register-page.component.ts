import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import size from 'lodash/size'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  form = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validators: [
        (formGroup) => {
          const password = formGroup.get('password')!
          const passwordConfirm = formGroup.get('passwordConfirm')!

          if (
            size(passwordConfirm.errors ?? {}) > 0 &&
            !passwordConfirm.errors?.['mustMatch']
          ) {
            return null
          }

          if (password.value !== passwordConfirm.value) {
            passwordConfirm!.setErrors({ mustMatch: true })
          }

          return null
        },
      ],
    }
  )

  get username() {
    return this.form.get('username')
  }

  get password() {
    return this.form.get('password')
  }

  get passwordConfirm() {
    return this.form.get('passwordConfirm')
  }
}
