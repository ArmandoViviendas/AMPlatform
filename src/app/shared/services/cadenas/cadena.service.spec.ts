import { TestBed } from '@angular/core/testing';

import { CadenaService } from './cadena.service';

describe('CadenaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CadenaService = TestBed.get(CadenaService);
    expect(service).toBeTruthy();
  });
});
