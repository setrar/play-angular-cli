/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrisisDetailResolveService } from './crisis-detail-resolve.service';

describe('Service: CrisisDetailResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrisisDetailResolveService]
    });
  });

  it('should ...', inject([CrisisDetailResolveService], (service: CrisisDetailResolveService) => {
    expect(service).toBeTruthy();
  }));
});
