import { PlatformService } from '@/platform.service'
import { InjectionToken, Provider } from '@angular/core'

export const LOCAL_STORAGE = new InjectionToken<
  typeof localStorage | undefined
>('localStorage')

export function provideLocalStorage(): Provider {
  return {
    provide: LOCAL_STORAGE,
    deps: [PlatformService],
    useFactory: (platform: PlatformService) =>
      platform.isBrowser ? window.localStorage : null,
  }
}
