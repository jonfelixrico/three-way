import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms'
import {
  Observable,
  Subject,
  catchError,
  debounceTime,
  delay,
  distinctUntilChanged,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs'

@Injectable()
export class UsernameValidatorService implements AsyncValidator {
  private input$: Subject<string>

  /**
   * True means that the input is valid, false if otherwise.
   */
  private result$: Observable<boolean>

  constructor(private http: HttpClient) {
    this.input$ = new Subject()

    this.result$ = this.input$.pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((username) =>
        http
          .get<{ taken: boolean }>('/api/register', {
            params: {
              username,
            },
          })
          .pipe(
            map((value) => !value.taken),
            catchError(() => of(false))
          )
      )
    )
  }

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
