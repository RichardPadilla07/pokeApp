import { TestBed } from '@angular/core/testing';

import { PokeApp } from './poke-api';

describe('PokeApp', () => {
  let service: PokeApp;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokeApp);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
