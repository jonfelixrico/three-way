import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddedUserListComponent } from './added-user-list.component'

describe('AddedUserListComponent', () => {
  let component: AddedUserListComponent
  let fixture: ComponentFixture<AddedUserListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddedUserListComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddedUserListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
