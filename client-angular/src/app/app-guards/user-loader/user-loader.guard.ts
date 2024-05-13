import { IdentityService } from '@/user/identity.service'
import { inject } from '@angular/core'
import { CanActivateChildFn } from '@angular/router'

export const userLoaderGuard: CanActivateChildFn = async () => {
  const svc = inject(IdentityService)

  try {
    await svc.loadUser()
  } catch (e) {
    // TODO improve logs
    console.error(e)
  }

  return true
}
