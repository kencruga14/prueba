import { TestBed } from '@angular/core/testing';

import { GestionarInstrumentoCoopService } from './gestionar-instrumento-coop.service';

describe('GestionarInstrumentoCoopService', () => {
  let service: GestionarInstrumentoCoopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionarInstrumentoCoopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
