import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from '../models/user';

@Injectable({
    providedIn: 'root',
})
export class UsersRepository {
    private readonly usersUrl: string = environment.api.apero.basePath + environment.api.apero.routes.users;

    constructor(private readonly httpclient: HttpClient) {}

    public getUsers(): Observable<User[]> {
        return this.httpclient.get<User[]>(this.usersUrl);
    }
}
