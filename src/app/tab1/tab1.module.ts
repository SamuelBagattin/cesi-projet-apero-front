import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab1PageComponent } from './tab1-page.component';

import { CategoryViewComponent } from './category-view/category-view.component';
import { DistrictViewComponent } from './district-view/district-view.component';
import { RestaurantModalComponent } from './modal-page/restaurant-modal.component';
import { Tab1PageRoutingModule } from './tab1-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [Tab1PageComponent, RestaurantModalComponent, CategoryViewComponent, DistrictViewComponent],
})
export class Tab1PageModule {}
