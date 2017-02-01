/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CanDeactivateGuardService } from './can-deactivate-guard.service';

describe('Service: CanDeactivateGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateGuardService]
    });
  });

  it('should ...', inject([CanDeactivateGuardService], (service: CanDeactivateGuardService) => {
    expect(service).toBeTruthy();
  }));
});
