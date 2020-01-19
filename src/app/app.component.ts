import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <h1>{{ title }} app is running!</h1>
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularMvpVm';

  ngOnInit() {

  }
}
