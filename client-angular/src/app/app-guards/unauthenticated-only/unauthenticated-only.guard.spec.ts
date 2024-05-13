import { TestBed } from '@angular/core/testing'
import { CanActivateChildFn } from '@angular/router'

import { unauthenticatedOnlyGuard } from './unauthenticated-only.guard'

describe('unauthenticatedOnlyGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      unauthenticatedOnlyGuard(...guardParameters)
    )

  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('should be created', () => {
    expect(executeGuard).toBeTruthy()
  })
})
