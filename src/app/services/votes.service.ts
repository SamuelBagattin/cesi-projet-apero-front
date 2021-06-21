import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vote } from '../models/vote';
import { VotesRepository } from '../repositories/votes-repository.service';

@Injectable({
    providedIn: 'root',
})
export class VotesService {
    constructor(private readonly votesRepository: VotesRepository) {}

    public getVotes(aperoid: number): Observable<Vote[]> {
        return this.votesRepository.getVotes(aperoid);
    }
}
