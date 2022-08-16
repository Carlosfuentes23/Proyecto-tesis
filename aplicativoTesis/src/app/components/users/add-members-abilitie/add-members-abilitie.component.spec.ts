import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersAbilitieComponent } from './add-members-abilitie.component';

describe('AddMembersAbilitieComponent', () => {
  let component: AddMembersAbilitieComponent;
  let fixture: ComponentFixture<AddMembersAbilitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMembersAbilitieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersAbilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
