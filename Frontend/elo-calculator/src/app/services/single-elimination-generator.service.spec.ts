import { TestBed } from '@angular/core/testing';

import { SingleEliminationGeneratorService } from './single-elimination-generator.service';

describe('SingleEliminationGeneratorService', () => {
  let service: SingleEliminationGeneratorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleEliminationGeneratorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
