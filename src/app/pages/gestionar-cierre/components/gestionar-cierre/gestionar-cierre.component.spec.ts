import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarCierreComponent } from './gestionar-cierre.component';

describe('GestionarCierreComponent', () => {
  let component: GestionarCierreComponent;
  let fixture: ComponentFixture<GestionarCierreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarCierreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarCierreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
