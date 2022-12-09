import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarInstrumentoCoopComponent } from './gestionar-instrumento-coop.component';

describe('GestionarInstrumentoCoopComponent', () => {
  let component: GestionarInstrumentoCoopComponent;
  let fixture: ComponentFixture<GestionarInstrumentoCoopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarInstrumentoCoopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionarInstrumentoCoopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
