import { IdentityService } from '@/user/identity.service'
import { inject } from '@angular/core'
import { CanActivateChildFn, Router } from '@angular/router'

export const unauthenticatedOnlyGuard: CanActivateChildFn = () => {
  const identitySvc = inject(IdentityService)

  if (!identitySvc.user) {
    return true
  }

  const router = inject(Router)
  return router.parseUrl('/app')
}
