import { TestBed } from '@angular/core/testing';

import { FbAuth } from './fb-auth.service';

describe('FbAuth.ServiceService', () => {
  let service: FbAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FbAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
