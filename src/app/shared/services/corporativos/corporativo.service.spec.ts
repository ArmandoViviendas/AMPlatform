import { TestBed } from '@angular/core/testing';

import { CorporativoService } from './corporativo.service';

describe('CorporativoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CorporativoService = TestBed.get(CorporativoService);
    expect(service).toBeTruthy();
  });
});
