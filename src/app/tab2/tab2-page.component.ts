import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2-page.component.html',
    styleUrls: ['tab2-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Tab2PageComponent {}
