import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class RouteConstants {
    public endroits: string = RouteConstantsStatic.endroits;
    public aperos: string = RouteConstantsStatic.aperos;
    public profil: string = RouteConstantsStatic.profil;
    public endroitsGroupByCategory: string = RouteConstantsStatic.endroitsGroupByCategory;
    public endroitsGroupByQuartier: string = RouteConstantsStatic.endroitsGroupByQuartier;
    public endroitsGroupBy: string = RouteConstantsStatic.endroitsGroupBy;
}

export class RouteConstantsStatic {
    public static endroits: string = 'endroits';
    public static aperos: string = 'aperos';
    public static profil: string = 'profil';
    public static endroitsGroupByCategory: string = 'category';
    public static endroitsGroupByQuartier: string = 'district';
    public static endroitsGroupBy: string = 'group';
}
