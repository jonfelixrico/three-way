import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NgxsModule } from '@ngxs/store'
import { ChatSlice } from '../chat/chat.slice'

@NgModule({
  imports: [CommonModule, NgxsModule.forRoot([ChatSlice])],
})
export class StoreModule {}
