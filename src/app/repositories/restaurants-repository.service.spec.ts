import { TestBed } from '@angular/core/testing';

import { RestaurantsRepository } from './restaurants-repository.service';

describe('RestaurantsRepositoryService', () => {
  let service: RestaurantsRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantsRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
