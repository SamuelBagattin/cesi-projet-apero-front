import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryViewComponent } from './category-view.component';

describe('CategoryViewComponent', () => {
    let component: CategoryViewComponent;
    let fixture: ComponentFixture<CategoryViewComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoryViewComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoryViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
