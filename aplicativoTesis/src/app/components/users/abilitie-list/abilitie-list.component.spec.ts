import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbilitieListComponent } from './abilitie-list.component';

describe('AbilitieListComponent', () => {
  let component: AbilitieListComponent;
  let fixture: ComponentFixture<AbilitieListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbilitieListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AbilitieListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
