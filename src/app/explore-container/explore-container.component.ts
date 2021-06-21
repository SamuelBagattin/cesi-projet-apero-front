import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
    selector: 'app-explore-container',
    templateUrl: './explore-container.component.html',
    styleUrls: ['./explore-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExploreContainerComponent {
    @Input() public name: string;
}
