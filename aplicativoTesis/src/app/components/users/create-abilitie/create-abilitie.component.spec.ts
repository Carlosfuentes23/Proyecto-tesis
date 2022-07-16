import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAbilitieComponent } from './create-abilitie.component';

describe('CreateAbilitieComponent', () => {
  let component: CreateAbilitieComponent;
  let fixture: ComponentFixture<CreateAbilitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAbilitieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAbilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
