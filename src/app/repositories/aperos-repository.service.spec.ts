import { TestBed } from '@angular/core/testing';

import { AperosRepository } from './aperos-repository.service';

describe('AperosService', () => {
    let service: AperosRepository;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AperosRepository);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
