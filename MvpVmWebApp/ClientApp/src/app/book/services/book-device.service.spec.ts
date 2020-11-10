import { TestBed } from '@angular/core/testing';

import { BookDeviceService } from './book-device.service';

describe('BookDeviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookDeviceService = TestBed.get(BookDeviceService);
    expect(service).toBeTruthy();
  });
});
