import { NgModule, inject } from '@angular/core'
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  HttpHandlerFn,
  HttpRequest,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http'
import { provideLocalStorage } from './localstorage.provider'
import { StoreModule } from './store/store.module'
import { RealtimeModule } from '@/realtime/realtime.module'
import { UserModule } from '@/user/user.module'
import { IdentityService } from '@/user/identity.service'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule,
    RealtimeModule,
    UserModule,
  ],
  providers: [
    provideClientHydration(),
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
    provideLocalStorage(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
