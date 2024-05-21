import { TestBed } from '@angular/core/testing';

import { DeviceTypeManagementService } from './device-type-management.service';

describe('DeviceTypeManagementService', () => {
  let service: DeviceTypeManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeviceTypeManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
