import { TestBed } from '@angular/core/testing';

import { MyGroupService } from './my-group.service';

describe('MyGroupService', () => {
  let service: MyGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
