import { TestBed } from '@angular/core/testing';

import { ModbustcpService } from './modbustcp.service';

describe('ModbustcpService', () => {
  let service: ModbustcpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModbustcpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
