import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Apero } from '../../models/apero';
import { RouteConstants } from '../../route-constants';
import { DeviceService } from '../../services/device.service';
import { RestaurantsService } from '../../services/restaurants.service';
import { AperoModalComponent, AperoModalMode } from '../modal-page/apero-modal.component';

@Component({
    selector: 'app-apero-list',
    templateUrl: './apero-list.component.html',
    styleUrls: ['./apero-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AperoListComponent implements OnInit {
    public aperosChanges: Observable<Apero[]>;

    constructor(
        private readonly restaurantsService: RestaurantsService,
        private readonly modalController: ModalController,
        public readonly deviceService: DeviceService,
    ) {}

    public ngOnInit(): void {
        this.aperosChanges = this.restaurantsService.aperosChanges;
    }

    public async presentAddAperoModal(): Promise<void> {
        const modal = await this.modalController.create({
            component: AperoModalComponent,
            cssClass: 'my-class',
            componentProps: {
                mode: AperoModalMode.CREATE,
            },
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantsService.refreshAperos();
    }

    public async presentEditModalApero(apero: Apero): Promise<void> {
        const modal = await this.modalController.create({
            component: AperoModalComponent,
            cssClass: 'my-class',
            componentProps: {
                formData: apero,
                mode: AperoModalMode.UPDATE,
            },
        });
        await modal.present();
        await modal.onDidDismiss();
        this.restaurantsService.refreshAperos();
    }
}
