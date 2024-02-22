import { TestBed } from '@angular/core/testing';

import { SystemAdapterService } from './system-adapter.service';

describe('SystemAdapterService', () => {
  let service: SystemAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SystemAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
