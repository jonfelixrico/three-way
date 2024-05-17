import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-dialog-content',
  templateUrl: './create-dialog-content.component.html',
  styleUrl: './create-dialog-content.component.scss',
})
export class CreateDialogContentComponent {
  form = new FormGroup({
    name: new FormControl('name', {
      validators: [Validators.required],
    }),
  })
}
