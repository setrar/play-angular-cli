/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrisisService } from './crisis.service';

describe('Service: Crisis', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrisisService]
    });
  });

  it('should ...', inject([CrisisService], (service: CrisisService) => {
    expect(service).toBeTruthy();
  }));
});
