import { TestBed, inject } from '@angular/core/testing';

import { TeximateService } from './teximate.service';

describe('TeximateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TeximateService]
    });
  });

  it('should ...', inject([TeximateService], (service: TeximateService) => {
    expect(service).toBeTruthy();
  }));
});
