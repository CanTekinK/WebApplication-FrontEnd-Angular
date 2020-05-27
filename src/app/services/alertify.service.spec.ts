import { TestBed } from '@angular/core/testing';

import { AlertifyService } from './alertify.service';

describe('AlertifyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlertifyService = TestBed.get(AlertifyService);
    expect(service).toBeTruthy();
  });
});
