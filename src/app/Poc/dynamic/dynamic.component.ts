import { Component, OnInit, Input } from '@angular/core';
import { IDynamicComponent } from '../idynamic-component';

@Component({
  selector: 'app-dynamic',
  template: `
    <div>
      <H2>{{ data.headline }}</H2>
      <i>{{ data.body }}</i>
      <hr>
    </div>
  `,
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent implements OnInit, IDynamicComponent {
  @Input() data: any;

  constructor() { }

  ngOnInit() {
  }

}
