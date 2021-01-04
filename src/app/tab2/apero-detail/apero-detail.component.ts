import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-apero-detail',
    templateUrl: './apero-detail.component.html',
    styleUrls: ['./apero-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AperoDetailComponent {
    constructor(public readonly activatedRoute: ActivatedRoute) {}
}
