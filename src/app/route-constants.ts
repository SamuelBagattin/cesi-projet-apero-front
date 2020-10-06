import {Injectable, InjectionToken} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class RouteConstants{
    endroits = 'endroits';
    aperos = 'aperos';
    profil = 'profil';
    endroitsGroupByCategory = 'category';
    endroitsGroupByQuartier = 'district';
    endroitsGroupBy = 'group';
}

export class RouteConstantsStatic{
    static endroits = 'endroits';
    static aperos = 'aperos';
    static profil = 'profil';
    static endroitsGroupByCategory = 'category';
    static endroitsGroupByQuartier = 'district';
    static endroitsGroupBy = 'group';
}
