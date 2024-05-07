import { CanActivate, ExecutionContext } from '@nestjs/common'

export class MockGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const http = context.switchToHttp()
    http.getRequest().user = {
      id: 'test',
    }

    return true
  }
}
