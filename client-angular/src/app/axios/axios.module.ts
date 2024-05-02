import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AXIOS_PROVIDER } from './axios.constants'
import axios from 'axios'

@NgModule({
  providers: [
    {
      provide: AXIOS_PROVIDER,
      useFactory: () =>
        axios.create({
          baseURL: '/api',
        }),
    },
  ],
  imports: [CommonModule],
})
export class AxiosModule {}
