import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { UsersRepository } from '../repositories/users-repository.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private usersSubject: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
    public usersChanges: Observable<User[]> = this.usersSubject.asObservable();
    constructor(private readonly usersRepository: UsersRepository) {
        this.refreshVotes();
    }

    public refreshVotes(): void {
        this.usersRepository.getUsers().subscribe((e: User[]) => {
            this.usersSubject.next(e);
        });
    }
}
