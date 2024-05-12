import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxsModule } from '@ngxs/store'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'
import { UserSlice } from '@/user/user.slice'
import { ChatSlice } from '@/chat-services/chat.slice'

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([ChatSlice, UserSlice], {
      // TODO set appropriately
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
})
export class StoreModule {}
