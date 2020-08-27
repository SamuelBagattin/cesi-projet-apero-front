import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {ModalController, ToastController} from '@ionic/angular';
import {RestaurantsService} from '../services/restaurants.service';
import {Category} from '../models/category';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Restaurant} from '../models/restaurant';
import {Quartier} from '../models/quartier';

export enum RestaurantModalMode{
    CREATE,
    UPDATE
}

@Component({
    selector: 'app-add-restaurant-modal',
    templateUrl: './restaurant-modal.component.html',
    styleUrls: ['./restaurant-modal.component.scss'],
})
export class RestaurantModalComponent implements OnInit {

    @Input() mode: RestaurantModalMode;
    public isUpdateMode: boolean;
    public isCreationMode: boolean;

    public nameFormControl: FormControl = new FormControl('', [Validators.required]);
    public noteFormControl: FormControl = new FormControl('', [Validators.required]);
    public appreciationFormControl: FormControl = new FormControl('', [Validators.required]);
    public prixMoyenFormControl: FormControl = new FormControl('', [Validators.required]);
    public adresseFormControl: FormControl = new FormControl('', [Validators.required]);
    public villeFormControl: FormControl = new FormControl('', [Validators.required]);
    public quartierFormControl: FormControl = new FormControl('', [Validators.required]);
    public categoryFormControl: FormControl = new FormControl('', [Validators.required]);
    public noteCopiositeFormControl: FormControl = new FormControl('', [Validators.required]);
    public noteDeliciositeFormControl: FormControl = new FormControl('', [Validators.required]);
    public noteCadreFormControl: FormControl = new FormControl('', [Validators.required]);
    public noteAccueilFormControl: FormControl = new FormControl('', [Validators.required]);

    public formGroup: FormGroup = new FormGroup({
        nom: this.nameFormControl,
        note: this.noteFormControl,
        appreciation: this.appreciationFormControl,
        prixmoyen: this.prixMoyenFormControl,
        adresse: this.adresseFormControl,
        ville: this.villeFormControl,
        quartierid: this.quartierFormControl,
        categorieid: this.categoryFormControl,
        notecopiosite: this.noteCopiositeFormControl,
        notedeliciosite: this.noteDeliciositeFormControl,
        notecadre: this.noteCadreFormControl,
        noteaccueil: this.noteAccueilFormControl,
    });

    public newCategoryFormControl: FormControl = new FormControl('', [Validators.required]);
    public newCategory: Category = {id: 0, libelle: ''};

    public newQuartierFormControl: FormControl = new FormControl('', [Validators.required]);
    public newQuartier: Quartier = {id: 0, libelle: ''};

    public noteOptions = [
        {note: 1, emoji: '🤮'},
        {note: 2, emoji: '😟'},
        {note: 3, emoji: '🙄'},
        {note: 4, emoji: '😊'},
        {note: 5, emoji: '😁'},
    ];

    @Input() public formData: Restaurant = null;

    public constructor(private readonly modalController: ModalController,
                       public readonly restaurantsService: RestaurantsService,
                       private readonly toastController: ToastController,
    ) {
    }

    ngOnInit() {
        this.isCreationMode = this.mode === RestaurantModalMode.CREATE;
        this.isUpdateMode = this.mode === RestaurantModalMode.UPDATE;
        console.log(this.formData);
        this.newCategoryFormControl.valueChanges.subscribe((e: string) => {
            this.newCategory.libelle = e;
        });
        this.newQuartierFormControl.valueChanges.subscribe((e: string) => {
            this.newQuartier.libelle = e;
        });
        this.subscribeToForm();
        if (this.isUpdateMode){
            const e = this.formData;
            this.formGroup.setValue({
                adresse: e.adresse,
                appreciation: e.appreciation,
                categorieid: e.categorieid,
                nom: e.nom,
                note: e.note,
                noteaccueil: e.noteaccueil,
                notecadre: e.notecadre,
                notecopiosite: e.notecopiosite,
                notedeliciosite: e.notedeliciosite,
                prixmoyen: e.prixmoyen,
                quartierid: e.quartierid,
                ville: e.ville
            });
        }
    }

    public submitCategory() {
        if (!this.newCategoryFormControl.valid) {
            return;
        }
        this.restaurantsService.addCategory(this.newCategory).subscribe(async () => {
                await this.presentToast(`La catégorie ${this.newCategory.libelle} a bien été ajoutée`);
                this.restaurantsService.refreshCategories();
            },
            async () => {
                await this.presentToast(`ERREUR : La catégorie ${this.newCategory.libelle} n'a pas été ajoutée`);
                this.restaurantsService.refreshCategories();
        });
    }

    public submitQuartier() {
        if (!this.newQuartierFormControl.valid){
            return;
        }
        this.restaurantsService.addQuartier(this.newQuartier).subscribe(async () => {
                await this.presentToast(`Le quartier ${this.newCategory.libelle} a bien été ajouté`);
                this.restaurantsService.refreshQuartiers();
            },
            async () => {
                await this.presentToast(`ERREUR : Le quartier ${this.newCategory.libelle} n'a pas été ajouté`);
                this.restaurantsService.refreshQuartiers();
            });
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

    public submitRestaurant() {
        console.log(this.formGroup.valid);
        console.log(this.formGroup.errors);
        if (this.formGroup.valid) {
            this.restaurantsService.addRestaurant(this.formData).subscribe(async () => {
                    await this.presentToast(`Le restaurant ${this.formData.nom} a bien été ajouté`);
                    await this.dismissModal();
                },
                async () => {
                    await this.presentToast(`ERREUR : Le restaurant ${this.formData.nom} n'a pas été ajouté`);
                    await this.dismissModal();
                });
        }
    }

    public updateRestaurant() {
        if (this.formGroup.valid){
            this.restaurantsService.updateRestaurant(this.formData).subscribe(async () => {
                    await this.presentToast(`Le restaurant ${this.formData.nom} a bien été modifié`);
                    await this.dismissModal();
                },
                async () => {
                    await this.presentToast(`ERREUR : Le restaurant ${this.formData.nom} n'a pas été modifié`);
                    await this.dismissModal();
                });
        }
    }

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
