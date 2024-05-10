import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import size from 'lodash/size'
import { firstValueFrom } from 'rxjs'

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss',
})
export class RegisterPageComponent {
  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  form = new FormGroup(
    {
      // TODO implement username check
      username: new FormControl('', [Validators.required]),

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

          if (
            size(passwordConfirm.errors ?? {}) > 0 &&
            !passwordConfirm.errors?.['mustMatch']
          ) {
            passwordConfirm.setErrors(null)
            return null
          }

          if (password.value !== passwordConfirm.value) {
            passwordConfirm.setErrors({ mustMatch: true })
          } else {
            passwordConfirm.setErrors(null)
          }

          return null
        },
      ],
    }
  )

  async submit() {
    const { password, username } = this.form.value

    try {
      await firstValueFrom(
        this.http.post('/api/register', {
          username,
          password,
        })
      )

      await this.router.navigateByUrl('/login')
    } catch (e) {
      // TODO add error handling
      console.log(e)
    }
  }
}
