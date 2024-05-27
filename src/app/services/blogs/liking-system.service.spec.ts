import { TestBed } from '@angular/core/testing';

import { LikingSystemService } from './liking-system.service';

describe('LikingSystemService', () => {
  let service: LikingSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikingSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
