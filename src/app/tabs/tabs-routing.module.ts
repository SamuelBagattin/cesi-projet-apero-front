import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteConstantsStatic } from '../route-constants';
import { TabsPageComponent } from './tabs-page.component';
// tslint:disable:typedef
const routes: Routes = [
    {
        path: 'tabs',
        component: TabsPageComponent,
        children: [
            {
                path: RouteConstantsStatic.endroits,
                loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule),
            },
            {
                path: RouteConstantsStatic.aperos,
                loadChildren: () => import('../tab2/tab2.module').then(m => m.Tab2PageModule),
            },
            {
                path: RouteConstantsStatic.profil,
                loadChildren: () => import('../tab3/tab3.module').then(m => m.Tab3PageModule),
            },
            {
                path: '',
                redirectTo: '/tabs/' + RouteConstantsStatic.aperos,
                pathMatch: 'full',
            },
        ],
    },
    {
        path: '',
        redirectTo: '/tabs/' + RouteConstantsStatic.aperos,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TabsPageRoutingModule {}
