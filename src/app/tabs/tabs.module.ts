import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPageComponent } from './tabs-page.component';

@NgModule({
    imports: [IonicModule, CommonModule, FormsModule, TabsPageRoutingModule],
    declarations: [TabsPageComponent],
})
export class TabsPageModule {}
