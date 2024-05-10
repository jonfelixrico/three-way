import { NgModule, inject } from '@angular/core'
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideLocalStorage } from './localstorage.provider'
import { StoreModule } from './store/store.module'
import { RealtimeModule } from '@/realtime/realtime.module'
import { UserModule } from '@/user/user.module'
import { AppHttpModule } from '@/app-http/app-http.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule,
    RealtimeModule,
    UserModule,
    AppHttpModule,
  ],
  providers: [provideClientHydration(), provideLocalStorage()],
  bootstrap: [AppComponent],
})
export class AppModule {}
