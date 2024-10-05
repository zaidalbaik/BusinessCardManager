import { TestBed } from '@angular/core/testing';

import { AddBusinessCardAccessService } from './add-business-card-access.service';

describe('AddBusinessCardAccessService', () => {
  let service: AddBusinessCardAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddBusinessCardAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
