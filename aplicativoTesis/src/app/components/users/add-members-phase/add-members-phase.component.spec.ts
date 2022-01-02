import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersPhaseComponent } from './add-members-phase.component';

describe('AddMembersPhaseComponent', () => {
  let component: AddMembersPhaseComponent;
  let fixture: ComponentFixture<AddMembersPhaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMembersPhaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersPhaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
