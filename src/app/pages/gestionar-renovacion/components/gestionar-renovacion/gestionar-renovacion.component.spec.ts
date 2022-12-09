import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarRenovacionComponent } from './gestionar-renovacion.component';

describe('GestionarRenovacionComponent', () => {
  let component: GestionarRenovacionComponent;
  let fixture: ComponentFixture<GestionarRenovacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarRenovacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarRenovacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
