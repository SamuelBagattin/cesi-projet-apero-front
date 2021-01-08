import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab2PageComponent } from './tab2-page.component';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { AperoDetailComponent } from './apero-detail/apero-detail.component';
import { AperoListComponent } from './apero-list/apero-list.component';
import { AperoModalComponent } from './modal-page/apero-modal.component';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab2PageRoutingModule,
        ReactiveFormsModule,
        NgxDatatableModule,
    ],
    declarations: [Tab2PageComponent, AperoModalComponent, AperoDetailComponent, AperoListComponent],
})
export class Tab2PageModule {}
