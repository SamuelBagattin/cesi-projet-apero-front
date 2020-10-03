import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';
import {Apero} from '../models/apero';

@Injectable({
  providedIn: 'root'
})
export class AperosRepository {
    private readonly aperosUrl = environment.api.apero.basePath + environment.api.apero.routes.aperos;

    constructor(private readonly httpClient: HttpClient) { }

    public getAperos(): Observable<Apero[]> {
        return this.httpClient.get<Apero[]>(this.aperosUrl);
    }

    public addApero(apero: Apero): Observable<void> {
        return this.httpClient.post<void>(this.aperosUrl, apero);
    }
}
