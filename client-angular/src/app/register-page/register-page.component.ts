import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { firstValueFrom } from 'rxjs'
import omit from 'lodash/omit'
import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'

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
      // TODO add error handling
      console.log(e)
    }
  }
}
