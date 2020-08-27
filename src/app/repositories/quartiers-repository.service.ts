import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Quartier} from '../models/quartier';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuartiersRepository {
  private readonly quartierUrl = 'http://localhost:8080/restaurantQuartier';

  constructor(private readonly httpclient: HttpClient) { }

  public getQuartiers(): Observable<Quartier[]> {
    return this.httpclient.get<Quartier[]>(this.quartierUrl);
  }

  public addQuartier(quartier: Quartier): Observable<void> {
    return this.httpclient.post<void>(this.quartierUrl, quartier);
  }
}
