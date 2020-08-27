import {Component, OnInit} from '@angular/core';
import {RestaurantsService} from '../services/restaurants.service';
import {Restaurant} from '../models/restaurant';
import {ModalController} from '@ionic/angular';
import {RestaurantModalComponent, RestaurantModalMode} from '../modal-page/restaurant-modal.component';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    public restaurantsChanges: Observable<Restaurant[]>;

    constructor(private readonly restaurantService: RestaurantsService, private readonly modalController: ModalController) {
    }

    ngOnInit(): void {
        this.restaurantsChanges = this.restaurantService.restaurantsChanges.pipe(map((e) => e.sort((a, b) => a.id - b.id)));
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
