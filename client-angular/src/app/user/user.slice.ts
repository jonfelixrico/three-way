import { Injectable } from '@angular/core'
import { State } from '@ngxs/store'

interface User {
  id: string
  username: string
}

export interface UserSliceModel {
  user: User | null
}

@State<UserSliceModel>({
  name: 'user',
  defaults: {
    user: null,
  },
})
@Injectable()
export class UserSlice {}
