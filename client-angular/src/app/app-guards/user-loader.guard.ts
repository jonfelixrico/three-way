import { LOCAL_STORAGE } from '@/localstorage.provider'
import { inject } from '@angular/core'
import { CanActivateChildFn } from '@angular/router'

export const userLoaderGuard: CanActivateChildFn = async () => {
  const token = inject(LOCAL_STORAGE)?.getItem('accessToken')
  if (!token) {
    return true
  }

  // TODO do something

  return true
}
