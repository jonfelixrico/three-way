import { NgModule } from '@angular/core'
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { provideHttpClient, withFetch } from '@angular/common/http'
import { provideLocalStorage } from './localstorage.provider'
import { StoreModule } from './store/store.module'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideLocalStorage(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
