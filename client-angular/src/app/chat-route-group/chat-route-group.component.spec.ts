import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ChatRouteGroupComponent } from './chat-route-group.component'

describe('ChatRouteGroupComponent', () => {
  let component: ChatRouteGroupComponent
  let fixture: ComponentFixture<ChatRouteGroupComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatRouteGroupComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(ChatRouteGroupComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
