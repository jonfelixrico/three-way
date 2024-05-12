import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-text-dialog-content',
  standalone: true,
  imports: [],
  templateUrl: './text-dialog-content.component.html',
})
export class TextDialogContentComponent {
  @Input({
    required: true,
  })
  text!: string
}
