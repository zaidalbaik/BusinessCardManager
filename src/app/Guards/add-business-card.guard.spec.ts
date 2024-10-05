import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { addBusinessCardGuard } from './add-business-card.guard';

describe('addBusinessCardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => addBusinessCardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
