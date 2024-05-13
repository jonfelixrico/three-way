import { CanActivate, ExecutionContext } from '@nestjs/common'

export class MockGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp()
    http.getRequest().user = {
      // id of user seed-1. see *-seed.ts under the migrations folder for the origin
      id: '20354d7a-e4fe-47af-8ff6-187bca92f3f9',
    }

    return true
  }
}
