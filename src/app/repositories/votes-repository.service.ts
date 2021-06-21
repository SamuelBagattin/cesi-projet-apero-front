import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Vote } from '../models/vote';

@Injectable({
    providedIn: 'root',
})
export class VotesRepository {
    private readonly aperoUrls: string = environment.api.apero.basePath + environment.api.apero.routes.aperos;

    constructor(private readonly httpClient: HttpClient) {}

    public getVotes(aperoid: number): Observable<Vote[]> {
        return this.httpClient.get<Vote[]>(`${this.aperoUrls}/${aperoid}/votes`);
    }
}
