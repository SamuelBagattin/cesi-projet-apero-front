import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AperoDetailComponent } from './apero-detail/apero-detail.component';
import { AperoListComponent } from './apero-list/apero-list.component';
import { Tab2PageComponent } from './tab2-page.component';

const routes: Routes = [
    {
        path: '',
        component: Tab2PageComponent,
        children: [
            { path: '', component: AperoListComponent },
            {
                path: ':id',
                component: AperoDetailComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class Tab2PageRoutingModule {}
