import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesRepository {
  private readonly categoryUrl = 'http://localhost:8080/restaurantCategories';

  constructor(private readonly httpClient: HttpClient) { }

  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.categoryUrl);
  }

  public addCategory(category: Category): Observable<void> {
    return this.httpClient.post<void>(this.categoryUrl, category);
  }
}
