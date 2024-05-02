import { TestBed } from '@angular/core/testing';

import { BriscaService } from './brisca.service';

describe('BriscaService', () => {
  let service: BriscaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriscaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
