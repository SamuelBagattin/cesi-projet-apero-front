import {Component, OnDestroy, OnInit} from '@angular/core';
import {RestaurantsService} from '../services/restaurants.service';
import {Restaurant} from '../models/restaurant';
import {ModalController} from '@ionic/angular';
import {Observable, Subscription} from 'rxjs';
import {RestaurantModalComponent, RestaurantModalMode} from './modal-page/restaurant-modal.component';
import {Category} from '../models/category';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {RouteConstants} from '../route-constants';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit, OnDestroy {

    public restaurants: Restaurant[] = [];
    private restaurantsSubscription: Subscription;

    public categories: Category[] = [];
    private categoriesSubscription: Subscription;

    public groupQueryParam: string;

    constructor(private readonly restaurantService: RestaurantsService, private readonly modalController: ModalController, private readonly activatedRoute: ActivatedRoute, public readonly routingConstants: RouteConstants, private readonly router: Router) {
    }

    public async switchToGroupByView(viewMode: string) {
        await this.router.navigate(
            [],
            {
                relativeTo: this.activatedRoute,
                queryParams: Array.from(
                    new Map<string, string>([[this.routingConstants.endroitsGroupBy, viewMode]]
                    )
                ).reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {}),
                queryParamsHandling: 'merge', // remove to replace all query params by provided
            });
    }

    ngOnDestroy(): void {
        this.restaurantsSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.pipe(map((params: Params) => params[this.routingConstants.endroitsGroupBy])).subscribe(async (e: string) => {
            if (e && [this.routingConstants.endroitsGroupByCategory, this.routingConstants.endroitsGroupByQuartier].includes(e)) {
                this.groupQueryParam = e;
            } else {
                await this.switchToGroupByView(this.routingConstants.endroitsGroupByCategory);
            }
        });
        this.restaurantsSubscription = this.restaurantService.restaurantsChanges.subscribe((e: Restaurant[]) => {
            this.restaurants = e;
        });
        this.categoriesSubscription = this.restaurantService.categoriesChanges.subscribe((e: Category[]) => {
            this.categories = e;
        });
    }


    async presentAddRestaurantModal() {
        const modal = await this.modalController.create({
            component: RestaurantModalComponent,
            cssClass: 'my-class',
            componentProps: {
                mode: RestaurantModalMode.CREATE
            }
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantService.refreshRestaurants();
    }

    async presentEditRestaurantModal(restaurant: Restaurant) {
        const modal = await this.modalController.create({
            component: RestaurantModalComponent,
            cssClass: 'my-class',
            componentProps: {
                formData: restaurant,
                mode: RestaurantModalMode.UPDATE
            }
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantService.refreshRestaurants();
    }
}
