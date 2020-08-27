import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Restaurant} from '../models/restaurant';
import {Category} from '../models/category';
import {Quartier} from '../models/quartier';
import {RestaurantsRepository} from '../repositories/restaurants-repository.service';
import {CategoriesRepository} from '../repositories/categories-repository.service';
import {QuartiersRepository} from '../repositories/quartiers-repository.service';

@Injectable({
    providedIn: 'root'
})
export class RestaurantsService {

    private restaurantsSubject: BehaviorSubject<Restaurant[]> = new BehaviorSubject<Restaurant[]>([]);
    public restaurantsChanges: Observable<Restaurant[]> = this.restaurantsSubject.asObservable();

    private categoriesSubject: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>([]);
    public categoriesChanges: Observable<Category[]> = this.categoriesSubject.asObservable();

    private quartiersSubject: BehaviorSubject<Quartier[]> = new BehaviorSubject<Quartier[]>([]);
    public quartiersChanges: Observable<Quartier[]> = this.quartiersSubject.asObservable();

    constructor(
        private readonly httpclient: HttpClient,
        private readonly restaurantsRepository: RestaurantsRepository,
        private readonly categoriesRespository: CategoriesRepository,
        private readonly quartiersRepository: QuartiersRepository
    ) {
        this.refreshRestaurants();
        this.refreshCategories();
        this.refreshQuartiers();
    }

    public refreshRestaurants(): void {
        this.restaurantsRepository.getRestaurants().subscribe((e: Restaurant[]) => {
            this.restaurantsSubject.next(e);
        });
    }

    public addRestaurant(restaurant: Restaurant): Observable<void> {
        return this.restaurantsRepository.addRestaurant(restaurant);
    }

    public updateRestaurant(restaurant: Restaurant): Observable<void> {
        return this.restaurantsRepository.putRestaurant(restaurant.id, restaurant);
    }

    public refreshCategories(): void {
        this.categoriesRespository.getCategories().subscribe((e: Category[]) => {
            this.categoriesSubject.next(e);
        });
    }

    public addCategory(category: Category): Observable<void> {
        return this.categoriesRespository.addCategory(category);
    }

    public refreshQuartiers(): void {
        this.quartiersRepository.getQuartiers().subscribe((e: Quartier[]) => {
            this.quartiersSubject.next(e);
        });
    }

    public addQuartier(quartier: Quartier): Observable<void> {
        return this.quartiersRepository.addQuartier(quartier);
    }


}
