import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AperoDetailComponent } from './apero-detail.component';

describe('AperoDetailComponent', () => {
    let component: AperoDetailComponent;
    let fixture: ComponentFixture<AperoDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AperoDetailComponent],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(AperoDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
