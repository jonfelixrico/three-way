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

  @Input()
  errorMessages: {
    error: string
    message: string
  }[] = []

  @Input() id?: string

  get errorMessage() {
    const fc = this.control

    if (!(fc.invalid && !fc.pristine)) {
      return
    }

    return this.errorMessages?.find(({ error }) => fc.hasError(error))?.message
  }
}
