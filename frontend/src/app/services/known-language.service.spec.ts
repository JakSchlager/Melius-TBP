import { TestBed } from '@angular/core/testing';

import { KnownLanguageService } from './known-language.service';

describe('KnownLanguageService', () => {
  let service: KnownLanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnownLanguageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
