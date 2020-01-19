import { Component, OnInit, Input } from '@angular/core';
import { AdItem } from './Poc/ad-item';
import { DynamicComponent} from './Poc/dynamic/dynamic.component';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{ title }} app is running!</h1>
  <app-dynamic-container [ads]="adItems"></app-dynamic-container>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularMvpVm';
  @Input() adItems: AdItem[] = new Array<AdItem>();

  ngOnInit() {

    const item = new AdItem();
    item.data = {headline: 'headline #1', body: '#1 Defined in app.component' };
    item.component = DynamicComponent;
    this.adItems.push(item);

    const item2 = new AdItem();
    item2.data = {headline: 'headline #2', body: '#2 Defined in app.component' };
    item2.component = DynamicComponent;
    this.adItems.push(item2);

    console.log(this.adItems);
  }
}
