import { TestBed } from '@angular/core/testing'
import { CanActivateChildFn } from '@angular/router'

import { authenticatedOnlyGuard } from './authenticated-only.guard'

describe('authenticatedOnlyGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() =>
      authenticatedOnlyGuard(...guardParameters)
    )

  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('should be created', () => {
    expect(executeGuard).toBeTruthy()
  })
})
