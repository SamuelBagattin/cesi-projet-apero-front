import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-district-view',
    templateUrl: './district-view.component.html',
    styleUrls: ['./district-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DistrictViewComponent {}
