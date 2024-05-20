import { User } from '@/user/user.types'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  async findByUsername(username: string): Promise<User[]> {
    return await firstValueFrom(
      this.http.get<User[]>('/api/user', {
        params: {
          username,
        },
      })
    )
  }
}
