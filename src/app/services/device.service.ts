import { Injectable } from '@angular/core';
import { fromEvent, BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class DeviceService {
    private readonly isMobileSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public isMobileChanges: Observable<boolean> = this.isMobileSubject.asObservable();

    constructor() {
        const checkScreenSize = () => document.body.offsetWidth < 900;
        this.isMobileSubject.next(checkScreenSize());
        fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => {
                this.isMobileSubject.next(checkScreenSize());
            });
    }
}
