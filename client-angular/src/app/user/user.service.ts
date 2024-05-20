import { User } from '@/user/user.types'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  listByUsername$(username: string) {
    return this.http.get<User[]>('/api/user', {
      params: {
        username,
      },
    })
  }
}
