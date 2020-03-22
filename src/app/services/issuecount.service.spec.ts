import { TestBed } from '@angular/core/testing';

import { IssuecountService } from './issuecount.service';

describe('IssuecountService', () => {
  let service: IssuecountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IssuecountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
