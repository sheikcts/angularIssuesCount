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
  it('should able to retrive response from file read data with valid headers', () => {
    const csvData = "First name,Sur name,Issue count,Date of birth\nTheo,Jansen,5,1978-01-02T00:00:00\nFiona,de Vries,7,1950-11-12T00:00:00\nPetra,Boersma,1,2001-04-20T00:00:00";
   
    const result = service.postFormData(csvData);
   
		expect(result['status']).toBe(true);
  });
  it('should able to retrive response from file read data with invalid headers', () => {
    const csvData = "First name,Sur name,Issue count\nTheo,Jansen,5,1978-01-02T00:00:00\nFiona,de Vries,7,1950-11-12T00:00:00\nPetra,Boersma,1,2001-04-20T00:00:00";
   
    const result = service.postFormData(csvData);
   
		expect(result['status']).toBe(false);
  });
});
