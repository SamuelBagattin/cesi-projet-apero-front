import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Quartier } from '../models/quartier';

@Injectable({
    providedIn: 'root',
})
export class QuartiersRepository {
    private readonly quartierUrl: string = environment.api.apero.basePath + environment.api.apero.routes.quartiers;

    constructor(private readonly httpclient: HttpClient) {}

    public getQuartiers(): Observable<Quartier[]> {
        return this.httpclient.get<Quartier[]>(this.quartierUrl);
    }

    public addQuartier(quartier: Quartier): Observable<void> {
        return this.httpclient.post<void>(this.quartierUrl, quartier);
    }
}
