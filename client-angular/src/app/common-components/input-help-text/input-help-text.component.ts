import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-input-help-text',
  standalone: true,
  imports: [NgIf],
  templateUrl: './input-help-text.component.html',
})
export class InputHelpTextComponent {
  @Input({
    required: true,
  })
  control!: AbstractControl

  @Input()
  hintMessage?: string

  @Input() formControlName?: string

  @Input()
  errorMessages: {
    error: string
    message: string
  }[] = []

  @Input() id?: string

  private get formControl() {
    if (this.formControlName) {
      const foundControl = this.control.get(this.formControlName)

      if (!foundControl) {
        throw new Error('Control not found!')
      }

      return foundControl
    }

    return this.control
  }

  get errorMessage() {
    const fc = this.formControl

    if (!(fc.invalid && !fc.pristine)) {
      return
    }

    return this.errorMessages?.find(({ error }) => fc.hasError(error))?.message
  }
}
