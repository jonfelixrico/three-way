import { plainToInstance } from 'class-transformer'

/**
 * A wrapper around `plainToInstance`. The difference is that the second argument (plain data)
 * in this method uses the type of the first arugment (class).
 *
 * @param clazz
 * @param plain
 * @param options
 * @returns
 */
export function toInstance<T>(
  clazz: Parameters<typeof plainToInstance<T, T>>[0],
  plain: T,
  options?: Parameters<typeof plainToInstance>[2]
) {
  return plainToInstance(clazz, plain, options)
}
