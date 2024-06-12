import { plainToInstance } from 'class-transformer'

export function toInstance<T>(
  clazz: Parameters<typeof plainToInstance<T, T>>[0],
  plain: T,
  options?: Parameters<typeof plainToInstance>[2]
) {
  return plainToInstance(clazz, plain, options)
}
