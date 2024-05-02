import { TestBed } from '@angular/core/testing';

import { BarajaService } from './baraja.service';

describe('BarajaService', () => {
  let service: BarajaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarajaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
