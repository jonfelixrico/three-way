import { Injectable } from '@angular/core'
import { Translation, TranslocoLoader } from '@jsverse/transloco'
import { HttpClient } from '@angular/common/http'
import { PlatformService } from '@/platform.service'
import { environment } from '@/environments/environment'

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    private platformSvc: PlatformService
  ) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(
      this.platformSvc.isBrowser
        ? `/assets/i18n/${lang}.json`
        : `${environment.baseUrl}/assets/i18n/${lang}.json`
    )
  }
}
