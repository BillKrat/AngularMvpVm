import {Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { ComponentFactory } from '../factories/component-factory';
import { ViewItem } from '../model/view-item';

@Component({
  selector: 'app-dynamic-container',
  template: `<ng-template appViewRef=""></ng-template>`,
  styleUrls: ['./dynamic-container.component.scss']
})

export class DynamicContainerComponent implements OnInit, OnDestroy {
  @Input() views: ViewItem[] = new Array<ViewItem>();

  @ViewChild(ViewRefDirective, { static: true })
  private viewRef: ViewRefDirective;

  interval: any;
  imagepath: string;
  currentAdIndex = -1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.setRefreshViewInterval();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    if (this.views.length === 0 || !this.viewRef) {
      return;
    }
    const factory = new ComponentFactory(this.componentFactoryResolver, this.viewRef);

    this.currentAdIndex = (this.currentAdIndex + 1) % this.views.length;
    factory.resolveViewitems(this.views, this.currentAdIndex);
  }

  setRefreshViewInterval() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
