import {IonicModule} from '@ionic/angular';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Tab1Page} from './tab1.page';
import {ExploreContainerComponentModule} from '../explore-container/explore-container.module';

import {Tab1PageRoutingModule} from './tab1-routing.module';
import {RestaurantModalComponent} from './modal-page/restaurant-modal.component';
import {CategoryViewComponent} from './category-view/category-view.component';
import {DistrictViewComponent} from './district-view/district-view.component';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        Tab1PageRoutingModule,
        ReactiveFormsModule,
    ],
    declarations: [Tab1Page, RestaurantModalComponent, CategoryViewComponent, DistrictViewComponent]
})
export class Tab1PageModule {
}
