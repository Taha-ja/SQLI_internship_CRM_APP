import { TestBed } from '@angular/core/testing';

import { InitDataService } from './init-data.service';

describe('InitDataService', () => {
  let service: InitDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InitDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
