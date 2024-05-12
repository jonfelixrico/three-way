import { ComponentFixture, TestBed } from '@angular/core/testing'

import { TextDialogContentComponent } from './text-dialog-content.component'

describe('TextDialogContentComponent', () => {
  let component: TextDialogContentComponent
  let fixture: ComponentFixture<TextDialogContentComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextDialogContentComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(TextDialogContentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
