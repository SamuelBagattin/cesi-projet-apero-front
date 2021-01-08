import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AperoListComponent } from './apero-list.component';

describe('AperoListComponent', () => {
  let component: AperoListComponent;
  let fixture: ComponentFixture<AperoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AperoListComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AperoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
