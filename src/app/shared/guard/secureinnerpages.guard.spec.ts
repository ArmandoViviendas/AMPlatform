import { TestBed, async, inject } from '@angular/core/testing';

import { SecureinnerpagesGuard } from './secureinnerpages.guard';

describe('SecureinnerpagesGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SecureinnerpagesGuard]
    });
  });

  it('should ...', inject([SecureinnerpagesGuard], (guard: SecureinnerpagesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
