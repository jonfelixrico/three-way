import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxsModule } from '@ngxs/store'
import { ChatSlice } from '../chat-services/chat.slice'
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin'

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forRoot([ChatSlice], {
      // TODO set appropriately
      developmentMode: true,
    }),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
})
export class StoreModule {}
