import { Component, OnInit, Input } from '@angular/core';
import { ViewItem } from './ioc-dynamic/model/view-item';
import { DynamicComponent } from './Poc/dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{ title }} app is running!</h1>
  <app-dynamic-container [views]="viewItems"></app-dynamic-container>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'AngularMvpVm';
  @Input() viewItems: ViewItem[] = new Array<ViewItem>();

  ngOnInit() {

    const item = new ViewItem();
    item.data = { headline: 'headline #1', body: '#1 Defined in app.component' };
    item.component = DynamicComponent;
    this.viewItems.push(item);

    const item2 = new ViewItem();
    item2.data = { headline: 'headline #2', body: '#2 Defined in app.component' };
    item2.component = DynamicComponent;
    this.viewItems.push(item2);

    console.log(this.viewItems);
  }
}
