import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouteConstants } from '../route-constants';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs-page.component.html',
    styleUrls: ['tabs-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsPageComponent {
    constructor(public readonly routingConstants: RouteConstants) {}
}
