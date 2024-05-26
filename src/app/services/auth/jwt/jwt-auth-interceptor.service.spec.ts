import { TestBed } from '@angular/core/testing';

import { JwtAuthInterceptorService } from './jwt-auth-interceptor.service';

describe('JwtAuthInterceptorService', () => {
  let service: JwtAuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JwtAuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
