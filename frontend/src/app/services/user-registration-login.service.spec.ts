import { TestBed } from '@angular/core/testing';

import { UserRegistrationLoginService } from './user-registration-login.service';

describe('UserRegistrationLoginService', () => {
  let service: UserRegistrationLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
