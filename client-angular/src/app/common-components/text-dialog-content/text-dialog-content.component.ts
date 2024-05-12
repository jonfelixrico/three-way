import { Component, Input } from '@angular/core'

/**
 * Just renders the text.
 *
 * This is intended as a utility for dynamic components if all we want to do is to render some text for the content.
 */
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
