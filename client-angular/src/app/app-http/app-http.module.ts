import { NgModule, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { IdentityService } from '@/user/identity.service'
import { UserModule } from '@/user/user.module'

@NgModule({
  providers: [
    provideHttpClient(
      withFetch(),
      withInterceptors([
        (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
          const identitySvc = inject(IdentityService)!
          const token = identitySvc.getAccessToken()

          if (!token) {
            return next(req)
          }

          return next(
            req.clone({
              headers: req.headers.append('Authorization', `Bearer ${token}`),
            })
          )
        },
      ])
    ),
  ],
  imports: [CommonModule, UserModule],
})
export class AppHttpModule {}
