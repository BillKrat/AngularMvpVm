import { TestBed } from '@angular/core/testing';

import { BookCloudService } from './book-cloud.service';

describe('BookCloudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BookCloudService = TestBed.get(BookCloudService);
    expect(service).toBeTruthy();
  });
});
