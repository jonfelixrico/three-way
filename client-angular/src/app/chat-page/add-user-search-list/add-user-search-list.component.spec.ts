import { ComponentFixture, TestBed } from '@angular/core/testing'

import { AddUserSearchListComponent } from './add-user-search-list.component'

describe('AddUserSearchListComponent', () => {
  let component: AddUserSearchListComponent
  let fixture: ComponentFixture<AddUserSearchListComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUserSearchListComponent],
    }).compileComponents()

    fixture = TestBed.createComponent(AddUserSearchListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
