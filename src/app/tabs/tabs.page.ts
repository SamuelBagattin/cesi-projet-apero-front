import { Component } from '@angular/core';
import {RouteConstants} from '../route-constants';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public readonly routingConstants: RouteConstants) {}

}
