import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitieComponent } from './abilitie.component';

describe('AbilitieComponent', () => {
  let component: AbilitieComponent;
  let fixture: ComponentFixture<AbilitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilitieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
