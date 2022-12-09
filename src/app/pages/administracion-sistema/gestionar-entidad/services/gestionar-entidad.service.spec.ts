import { TestBed } from '@angular/core/testing';

import { GestionarEntidadService } from './gestionar-entidad.service';

describe('GestionarEntidadService', () => {
  let service: GestionarEntidadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarEntidadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
