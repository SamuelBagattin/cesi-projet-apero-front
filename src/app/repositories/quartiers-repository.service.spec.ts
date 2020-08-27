import { TestBed } from '@angular/core/testing';

import { QuartiersRepository } from './quartiers-repository.service';

describe('QuartiersRepository', () => {
  let service: QuartiersRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuartiersRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
