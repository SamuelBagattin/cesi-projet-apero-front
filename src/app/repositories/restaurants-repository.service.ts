import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Restaurant } from '../models/restaurant';

@Injectable({
    providedIn: 'root',
})
export class RestaurantsRepository {
    private readonly restaurantsUrl: string = environment.api.apero.basePath + environment.api.apero.routes.endroits;

    constructor(private readonly httpClient: HttpClient) {}

    public addRestaurant(restaurant: Restaurant): Observable<void> {
        return this.httpClient.post<void>(this.restaurantsUrl, restaurant);
    }

    public getRestaurants(): Observable<Restaurant[]> {
        return this.httpClient.get<Restaurant[]>(this.restaurantsUrl);
    }

    public putRestaurant(restaurant: Restaurant): Observable<void> {
        return this.httpClient.put<void>(this.restaurantsUrl, restaurant);
    }
}
