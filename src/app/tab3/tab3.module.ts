import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { Tab3PageComponent } from './tab3-page.component';

import { Tab3PageRoutingModule } from './tab3-routing.module';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        ExploreContainerComponentModule,
        RouterModule.forChild([{ path: '', component: Tab3PageComponent }]),
        Tab3PageRoutingModule,
    ],
    declarations: [Tab3PageComponent],
})
export class Tab3PageModule {}
