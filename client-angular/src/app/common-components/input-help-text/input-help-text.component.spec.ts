import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InputHelpTextComponent } from './input-help-text.component'

describe('InputHelpTextComponent', () => {
  let component: InputHelpTextComponent
  let fixture: ComponentFixture<InputHelpTextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputHelpTextComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InputHelpTextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
