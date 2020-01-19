import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{ title }} app is running!</h1>
  <app-dynamic-container></app-dynamic-container>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularMvpVm';
}
