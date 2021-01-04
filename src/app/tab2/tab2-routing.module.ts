import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AperoDetailComponent } from './apero-detail/apero-detail.component';
import { Tab2PageComponent } from './tab2-page.component';

const routes: Routes = [
    {
        path: '',
        component: Tab2PageComponent,
    },
    {
        path: ':id',
        component: AperoDetailComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
