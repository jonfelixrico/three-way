import { InjectionToken, ProviderToken } from '@angular/core'
import type { Axios } from 'axios'

export const AXIOS_PROVIDER: ProviderToken<Axios> = new InjectionToken<Axios>(
  'AXIOS_PROVIDER'
)
