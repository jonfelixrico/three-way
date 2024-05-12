import { Component } from '@angular/core'
import { DynamicDialogConfig } from 'primeng/dynamicdialog'

/**
 * Just renders the text.
 *
 * This is intended as a utility for dynamic components if all we want to do is to render some text for the content.
 */
@Component({
  selector: 'app-text-dialog-content',
  standalone: true,
  template: '{{ text }}',
})
export class TextDialogContentComponent {
  text: string

  constructor(config: DynamicDialogConfig) {
    this.text = config.data.text
  }
}
