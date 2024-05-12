import { UserActions } from '@/user/user.actions'
import { User } from '@/user/user.types'
import { Injectable } from '@angular/core'
import { Action, State, StateContext } from '@ngxs/store'
import { produce } from 'immer'

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
export class UserSlice {
  @Action(UserActions.Set)
  setUser(ctx: StateContext<UserSliceModel>, { user }: UserActions.Set) {
    ctx.setState(
      produce((draft) => {
        draft.user = user
      })
    )
  }
}
