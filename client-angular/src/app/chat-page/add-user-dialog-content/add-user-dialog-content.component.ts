import { Component } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { DynamicDialogRef } from 'primeng/dynamicdialog'

@Component({
  selector: 'app-add-user-dialog-content',
  templateUrl: './add-user-dialog-content.component.html',
  styleUrl: './add-user-dialog-content.component.scss',
})
export class AddUserDialogContentComponent {
  form = new FormGroup({
    username: new FormControl('', {
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
