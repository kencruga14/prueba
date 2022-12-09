import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarEntidadComponent } from './gestionar-entidad.component';

describe('GestionarEntidadComponent', () => {
  let component: GestionarEntidadComponent;
  let fixture: ComponentFixture<GestionarEntidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarEntidadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarEntidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
