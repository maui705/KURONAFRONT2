import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActividadList } from './actividad-list';

describe('ActividadList', () => {
  let component: ActividadList;
  let fixture: ComponentFixture<ActividadList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActividadList],
    }).compileComponents();

    fixture = TestBed.createComponent(ActividadList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
