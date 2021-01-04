import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageComponent } from './tab2-page.component';

import { AperoModalComponent } from './modal-page/apero-modal.component';
import { Tab2PageRoutingModule } from './tab2-routing.module';
import {AperoDetailComponent} from "./apero-detail/apero-detail.component";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab2PageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [Tab2PageComponent, AperoModalComponent, AperoDetailComponent],
})
export class Tab2PageModule {}
