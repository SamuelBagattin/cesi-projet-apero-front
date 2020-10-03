import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Restaurant} from '../models/restaurant';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RestaurantsRepository {
    private readonly restaurantsUrl: string = environment.api.apero.basePath + environment.api.apero.routes.endroits;

    constructor(private readonly httpClient: HttpClient) {
    }

    public addRestaurant(restaurant: Restaurant): Observable<void> {
        return this.httpClient.post<void>(this.restaurantsUrl, restaurant);
    }

    public getRestaurants(): Observable<Restaurant[]> {
        return this.httpClient.get<Restaurant[]>(this.restaurantsUrl);
    }

    putRestaurant(id: number, restaurant: Restaurant) {
        return this.httpClient.put<void>(this.restaurantsUrl, restaurant);
    }
}
