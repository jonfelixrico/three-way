import { TestBed } from '@angular/core/testing'
import { CanActivateChildFn } from '@angular/router'

import { userLoaderGuard } from './user-loader.guard'

describe('userLoaderGuard', () => {
  const executeGuard: CanActivateChildFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => userLoaderGuard(...guardParameters))

  beforeEach(() => {
    TestBed.configureTestingModule({})
  })

  it('should be created', () => {
    expect(executeGuard).toBeTruthy()
  })
})
