import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMembersProyectComponent } from './add-members-proyect.component';

describe('AddMembersProyectComponent', () => {
  let component: AddMembersProyectComponent;
  let fixture: ComponentFixture<AddMembersProyectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMembersProyectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMembersProyectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
