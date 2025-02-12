import { TestBed } from '@angular/core/testing';

import { GhReposService } from './gh-repos.service';

describe('GhReposService', () => {
  let service: GhReposService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GhReposService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
