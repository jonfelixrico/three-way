import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateDialogContentComponent } from './create-dialog-content.component'

describe('CreateDialogContentComponent', () => {
  let component: CreateDialogContentComponent
  let fixture: ComponentFixture<CreateDialogContentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateDialogContentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(CreateDialogContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
