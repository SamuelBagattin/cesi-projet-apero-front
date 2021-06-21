import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';
import { Apero } from '../../models/apero';
import { RestaurantsService } from '../../services/restaurants.service';

export enum AperoModalMode {
    CREATE,
    UPDATE,
}

@Component({
    selector: 'app-add-apero-modal',
    templateUrl: './apero-modal.component.html',
    styleUrls: ['./apero-modal.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AperoModalComponent implements OnInit {
    @Input() public mode: AperoModalMode;
    public isUpdateMode: boolean;
    public isCreationMode: boolean;

    public nameFormControl: FormControl = new FormControl('', [Validators.required]);
    public dateFormControl: FormControl = new FormControl('', [Validators.required]);

    public formGroup: FormGroup = new FormGroup({
        nom: this.nameFormControl,
        date: this.dateFormControl,
    });

    @Input() public formData: Apero = null;

    public constructor(
        private readonly modalController: ModalController,
        public readonly restaurantsService: RestaurantsService,
        private readonly toastController: ToastController,
    ) {}

    public ngOnInit(): void {
        this.isCreationMode = this.mode === AperoModalMode.CREATE;
        this.isUpdateMode = this.mode === AperoModalMode.UPDATE;
        this.subscribeToForm();
    }

    public subscribeToForm(): void {
        this.formGroup.valueChanges.subscribe((e: Apero) => {
            if (!this.formGroup.valid) {
                return;
            }
            const oldData: Apero = Object.assign({}, this.formData);
            e.dateCreation = new Date();
            e.createur_Id = 1;
            this.formData = e;
            this.formData.id = oldData.id;
        });
    }

    public submitApero(): void {
        if (!this.formGroup.valid) {
            return;
        }
        this.restaurantsService.addApero(this.formData).subscribe(
            async () => {
                await this.presentToast(`L'apéro ${this.formData.nom} a bien été ajouté`);
                await this.dismissModal();
            },
            async () => {
                await this.presentToast(`ERREUR : L'apéro ${this.formData.nom} n'a pas été ajouté`);
                await this.dismissModal();
            },
        );
    }

    public async presentToast(message: string): Promise<void> {
        const toast = await this.toastController.create({
            message,
            duration: 2000,
        });
        await toast.present();
    }

    public async dismissModal(): Promise<void> {
        await this.modalController.dismiss({
            dismissed: true,
        });
    }
}
