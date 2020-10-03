import {Component, OnInit} from '@angular/core';
import {RestaurantsService} from '../services/restaurants.service';
import {Observable} from 'rxjs';
import {Apero} from '../models/apero';
import {map} from 'rxjs/operators';
import {RestaurantModalComponent, RestaurantModalMode} from '../tab1/modal-page/restaurant-modal.component';
import {Restaurant} from '../models/restaurant';
import {ModalController} from '@ionic/angular';
import {AperoModalComponent, AperoModalMode} from './modal-page/apero-modal.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

    public aperosChanges: Observable<Apero[]>;


  constructor(private readonly restaurantsService: RestaurantsService, private readonly modalController: ModalController) {}

    ngOnInit(): void {
        this.aperosChanges = this.restaurantsService.aperosChanges.pipe(map((e: Apero[]) => e.sort((a, b) => a.id - b.id)));
    }

    async presentAddAperoModal() {
        const modal = await this.modalController.create({
            component: AperoModalComponent,
            cssClass: 'my-class',
            componentProps: {
                mode: AperoModalMode.CREATE
            }
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantsService.refreshAperos();
    }

    async presentEditModalApero(apero: Apero) {
        const modal = await this.modalController.create({
            component: AperoModalComponent,
            cssClass: 'my-class',
            componentProps: {
                formData: apero,
                mode: AperoModalMode.UPDATE
            }
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantsService.refreshAperos();
    }


}
