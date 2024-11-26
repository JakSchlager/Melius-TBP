import { TestBed } from '@angular/core/testing';

import { SoftwareKnowledgeService } from './software-knowledge.service';

describe('SoftwareKnowledgeService', () => {
  let service: SoftwareKnowledgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoftwareKnowledgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
