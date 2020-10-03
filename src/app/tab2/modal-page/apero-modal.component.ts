import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../../models/category';
import {Quartier} from '../../models/quartier';
import {Restaurant} from '../../models/restaurant';
import {RestaurantsService} from '../../services/restaurants.service';

export enum AperoModalMode {
    CREATE,
    UPDATE
}

@Component({
    selector: 'app-add-apero-modal',
    templateUrl: './apero-modal.component.html',
    styleUrls: ['./apero-modal.component.scss'],
})
export class AperoModalComponent implements OnInit {

    @Input() mode: AperoModalMode;
    public isUpdateMode: boolean;
    public isCreationMode: boolean;

    public nameFormControl: FormControl = new FormControl('', [Validators.required]);

    public formGroup: FormGroup = new FormGroup({
        nom: this.nameFormControl
    });

    @Input() public formData: Restaurant = null;

    public constructor(private readonly modalController: ModalController,
                       public readonly restaurantsService: RestaurantsService,
                       private readonly toastController: ToastController,
    ) {
    }

    ngOnInit() {
        this.isCreationMode = this.mode === AperoModalMode.CREATE;
        this.isUpdateMode = this.mode === AperoModalMode.UPDATE;
        this.subscribeToForm();
        if (this.isUpdateMode) {
            const e = this.formData;
            this.formGroup.setValue({});
        }
    }

    public subscribeToForm() {
        this.formGroup.valueChanges.subscribe((e: Restaurant) => {
            if (this.formGroup.valid) {
                const oldData: Restaurant = Object.assign({}, this.formData);
                this.formData = e;
                this.formData.id = oldData.id;
            }
        });
    }

    public submitApero() {
        if (this.formGroup.valid) {
            this.restaurantsService.addRestaurant(this.formData).subscribe(async () => {
                    await this.presentToast(`L'apéro ${this.formData.nom} a bien été ajouté`);
                    await this.dismissModal();
                },
                async () => {
                    await this.presentToast(`ERREUR : L'apéro ${this.formData.nom} n'a pas été ajouté`);
                    await this.dismissModal();
                });
        }
    }

    // public updateApero() {
    //     if (this.formGroup.valid){
    //         this.restaurantsService.updateRestaurant(this.formData).subscribe(async () => {
    //                 await this.presentToast(`L'apéro ${this.formData.nom} a bien été modifié`);
    //                 await this.dismissModal();
    //             },
    //             async () => {
    //                 await this.presentToast(`ERREUR : L'apéro ${this.formData.nom} n'a pas été modifié`);
    //                 await this.dismissModal();
    //             });
    //     }
    // }

    async presentToast(message: string) {
        const toast = await this.toastController.create({
            message,
            duration: 2000
        });
        await toast.present();
    }

    public async dismissModal(): Promise<void> {
        await this.modalController.dismiss({
            dismissed: true
        });
    }
}
