import { IdentityService } from '@/user/identity.service'
import { inject } from '@angular/core'
import { CanActivateChildFn, Router } from '@angular/router'

export const authenticatedOnlyGuard: CanActivateChildFn = () => {
  const identitySvc = inject(IdentityService)

  if (identitySvc.getUserId()) {
    return true
  }

  const router = inject(Router)
  return router.parseUrl('/login')
}
