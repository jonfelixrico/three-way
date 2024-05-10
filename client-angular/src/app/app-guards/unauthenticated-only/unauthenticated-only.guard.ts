import { CanActivateChildFn } from '@angular/router'

export const unauthenticatedOnlyGuard: CanActivateChildFn = (
  childRoute,
  state
) => {
  return true
}
