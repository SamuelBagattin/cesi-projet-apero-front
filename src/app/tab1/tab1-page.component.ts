import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { Restaurant } from '../models/restaurant';
import { RouteConstants } from '../route-constants';
import { RestaurantsService } from '../services/restaurants.service';
import { RestaurantModalComponent, RestaurantModalMode } from './modal-page/restaurant-modal.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1-page.component.html',
    styleUrls: ['tab1-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab1PageComponent implements OnInit, OnDestroy {
    public restaurants: Restaurant[] = [];
    private restaurantsSubscription: Subscription;

    public categories: Category[] = [];
    private categoriesSubscription: Subscription;

    public groupQueryParam: string;

    constructor(
        private readonly restaurantService: RestaurantsService,
        private readonly modalController: ModalController,
        private readonly activatedRoute: ActivatedRoute,
        public readonly routingConstants: RouteConstants,
        private readonly router: Router,
        private readonly changeDetectorRef: ChangeDetectorRef,
    ) {}

    public async switchToGroupByView(viewMode: string): Promise<void> {
        await this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: Array.from(
                new Map<string, string>([[this.routingConstants.endroitsGroupBy, viewMode]]),
            ).reduce((obj: {}, [key, value]: [string, string]) => {
                obj[key] = value;
                return obj;
            }, {}),
            queryParamsHandling: 'merge', // remove to replace all query params by provided
        });
        this.changeDetectorRef.markForCheck();
    }

    public ngOnDestroy(): void {
        this.restaurantsSubscription.unsubscribe();
        this.categoriesSubscription.unsubscribe();
    }

    public ngOnInit(): void {
        this.activatedRoute.queryParams
            .pipe(map((params: Params) => params[this.routingConstants.endroitsGroupBy]))
            .subscribe(async (e: string) => {
                if (
                    e &&
                    [
                        this.routingConstants.endroitsGroupByCategory,
                        this.routingConstants.endroitsGroupByQuartier,
                    ].includes(e)
                ) {
                    this.groupQueryParam = e;
                } else {
                    await this.switchToGroupByView(this.routingConstants.endroitsGroupByCategory);
                }
                this.changeDetectorRef.markForCheck();
            });
        this.restaurantsSubscription = this.restaurantService.restaurantsChanges.subscribe((e: Restaurant[]) => {
            this.restaurants = e;
            this.changeDetectorRef.markForCheck();
        });
        this.categoriesSubscription = this.restaurantService.categoriesChanges.subscribe((e: Category[]) => {
            this.categories = e;
            this.changeDetectorRef.markForCheck();
        });
        this.changeDetectorRef.markForCheck();
    }

    public async presentAddRestaurantModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: RestaurantModalComponent,
            cssClass: 'my-class',
            componentProps: {
                mode: RestaurantModalMode.CREATE,
            },
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantService.refreshRestaurants();
    }

    public async presentEditRestaurantModal(restaurant: Restaurant): Promise<void> {
        const modal = await this.modalController.create({
            component: RestaurantModalComponent,
            cssClass: 'my-class',
            componentProps: {
                formData: restaurant,
                mode: RestaurantModalMode.UPDATE,
            },
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantService.refreshRestaurants();
    }
}
