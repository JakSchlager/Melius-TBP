import { TestBed } from '@angular/core/testing';

import { TESTrolesService } from './testroles.service';

describe('TESTrolesService', () => {
  let service: TESTrolesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TESTrolesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
