import { TestBed } from '@angular/core/testing';

import { HttpConfigInterceptor } from './http-config-interceptor.interceptor';

describe('HttpConfigInterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpConfigInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpConfigInterceptor = TestBed.inject(HttpConfigInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
