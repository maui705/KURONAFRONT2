import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadInsert } from './actividad-insert';

describe('ActividadInsert', () => {
  let component: ActividadInsert;
  let fixture: ComponentFixture<ActividadInsert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadInsert],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadInsert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
