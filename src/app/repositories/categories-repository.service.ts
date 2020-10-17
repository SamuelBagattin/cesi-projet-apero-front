import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root',
})
export class CategoriesRepository {
    private readonly categoryUrl: string = environment.api.apero.basePath + environment.api.apero.routes.categories;

    constructor(private readonly httpClient: HttpClient) {}

    public getCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>(this.categoryUrl);
    }

    public addCategory(category: Category): Observable<void> {
        return this.httpClient.post<void>(this.categoryUrl, category);
    }
}
