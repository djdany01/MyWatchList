import { TestBed, inject } from '@angular/core/testing';

import { SeriesService } from './series.service';

describe('ElementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeriesService]
    });
  });

  it('should be created', inject([SeriesService], (service: SeriesService) => {
    expect(service).toBeTruthy();
  }));
});