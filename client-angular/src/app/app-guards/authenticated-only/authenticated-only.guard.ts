import { CanActivateChildFn } from '@angular/router'

export const authenticatedOnlyGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  return true
}
