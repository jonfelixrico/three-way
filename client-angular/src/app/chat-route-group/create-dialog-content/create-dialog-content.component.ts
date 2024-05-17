import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

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

  constructor(private ref: DynamicDialogRef) {}

  submit() {
    if (!this.form.valid) {
      return
    }

    this.ref.close(this.form.value)
  }
}
