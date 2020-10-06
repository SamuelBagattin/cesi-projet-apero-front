import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Restaurant} from '../../models/restaurant';
import {Category} from '../../models/category';
import {Quartier} from '../../models/quartier';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})
export class CategoryViewComponent implements OnInit {

    @Input() restaurants: Restaurant[] = [];
    @Input() categories: Category[] = [];
    @Input() quartiers: Quartier[] = [];

    @Output() editEndroit: EventEmitter<Restaurant> = new EventEmitter<Restaurant>();

  ngOnInit() {}
    public getRestaurantsOfCategory(categoryId: number): Restaurant[]{
        return this.restaurants.filter((endroit: Restaurant) => endroit.categorieid === categoryId);
    }

    public sendEditEndroitEvent(endroit: Restaurant){
      this.editEndroit.emit(endroit);
    }


}
