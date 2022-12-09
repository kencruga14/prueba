import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarSuscripcionComponent } from './gestionar-suscripcion.component';

describe('GestionarSuscripcionComponent', () => {
  let component: GestionarSuscripcionComponent;
  let fixture: ComponentFixture<GestionarSuscripcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarSuscripcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarSuscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
