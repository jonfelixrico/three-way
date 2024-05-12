import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms'
import { Observable, catchError, delay, map, of, switchMap } from 'rxjs'

@Injectable()
export class UsernameValidatorService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<string, string>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return of(control.value).pipe(
      delay(500),
      switchMap((username) =>
        this.http
          .get<{ taken: boolean }>('/api/register', {
            params: {
              username,
            },
          })
          .pipe(
            map((value) => !value.taken),
            catchError(() => of(false))
          )
      ),
      map((isValid) => {
        if (isValid) {
          return null
        }

        return {
          usernameTaken: true,
        }
      })
    )
  }
}
