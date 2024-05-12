import { ComponentFixture, TestBed } from '@angular/core/testing'

import { InputSubtextComponent } from './input-subtext.component'

describe('InputSubtextComponent', () => {
  let component: InputSubtextComponent
  let fixture: ComponentFixture<InputSubtextComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSubtextComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(InputSubtextComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
