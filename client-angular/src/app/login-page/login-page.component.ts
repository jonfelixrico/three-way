import { IdentityService } from '@/user/identity.service'
import { HttpClient } from '@angular/common/http'
import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { lastValueFrom } from 'rxjs'
import forEach from 'lodash/forEach'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  constructor(
    private router: Router,
    private http: HttpClient,
    private identitySvc: IdentityService
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

      await this.router.navigateByUrl('/chat')
    } catch (e) {
      // TODO add error handling
      console.log(e)
    }
  }
}
