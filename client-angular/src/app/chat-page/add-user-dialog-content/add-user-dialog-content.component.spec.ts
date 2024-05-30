import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddUserDialogContentComponent } from './add-user-dialog-content.component'

describe('AddUserDialogContentComponent', () => {
  let component: AddUserDialogContentComponent
  let fixture: ComponentFixture<AddUserDialogContentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserDialogContentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddUserDialogContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
