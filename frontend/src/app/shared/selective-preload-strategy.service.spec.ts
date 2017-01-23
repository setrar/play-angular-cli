/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SelectivePreloadStrategyService } from './selective-preload-strategy.service';

describe('Service: SelectivePreloadStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectivePreloadStrategyService]
    });
  });

  it('should ...', inject([SelectivePreloadStrategyService], (service: SelectivePreloadStrategyService) => {
    expect(service).toBeTruthy();
  }));
});
