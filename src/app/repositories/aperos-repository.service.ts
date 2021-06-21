import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Apero } from '../models/apero';

@Injectable({
    providedIn: 'root',
})
export class AperosRepository {
    private readonly aperosUrl: string = environment.api.apero.basePath + environment.api.apero.routes.aperos;

    constructor(private readonly httpClient: HttpClient) {}

    public getAperos(): Observable<Apero[]> {
        return this.httpClient.get<Apero[]>(this.aperosUrl + '?include=user');
    }

    public addApero(apero: Apero): Observable<void> {
        return this.httpClient.post<void>(this.aperosUrl, apero);
    }
}
