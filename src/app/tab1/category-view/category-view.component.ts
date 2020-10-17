import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../models/category';
import { Quartier } from '../../models/quartier';
import { Restaurant } from '../../models/restaurant';

@Component({
    selector: 'app-category-view',
    templateUrl: './category-view.component.html',
    styleUrls: ['./category-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryViewComponent {
    @Input() public restaurants: Restaurant[] = [];
    @Input() public categories: Category[] = [];
    @Input() public quartiers: Quartier[] = [];

    @Output() public readonly editEndroit: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();

    public getRestaurantsOfCategory(categoryId: number): Restaurant[] {
        return this.restaurants.filter((endroit: Restaurant) => endroit.categorieid === categoryId);
    }

    public sendEditEndroitEvent(endroit: Restaurant): void {
        this.editEndroit.emit(endroit);
    }
}
