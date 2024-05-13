import { User } from '@/user/user.types'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserActions {
  export class Set {
    static readonly type = '[User] Set'
    constructor(public user: User | null) {}
  }
}
