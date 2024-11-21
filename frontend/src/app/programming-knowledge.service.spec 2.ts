import { TestBed } from '@angular/core/testing';

import { ProgrammingKnowledgeService } from './programming-knowledge.service';

describe('ProgrammingKnowledgeService', () => {
  let service: ProgrammingKnowledgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProgrammingKnowledgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
