import { ExecutionContext, createParamDecorator } from '@nestjs/common'

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request: { user?: { id: string } } = ctx.switchToHttp().getRequest()
    return request.user?.id
  }
)
