import { Component,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  ComponentFactoryResolver } from '@angular/core';
import { DynamicHostDirective } from '../dynamic-host.directive';
import { IDynamicComponent } from '../idynamic-component';
import { AdItem } from '../ad-item';

@Component({
  selector: 'app-dynamic-container',
  template: `
    <h2>Dynamic Host</h2>
    <ng-template appDynamicHost=""></ng-template>
  `,
  styleUrls: ['./dynamic-container.component.scss']
})

export class DynamicContainerComponent implements OnInit, OnDestroy {
  @Input() ads: AdItem[];
  @ViewChild(DynamicHostDirective, {static: true}) adHost: DynamicHostDirective;

  interval: any;
  currentAdIndex = -1;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {

  }

  ngOnInit() {
    this.loadComponent();
    this.getAds();
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.ads.length;
    const adItem = this.ads[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(adItem.component);

    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    const dynamicInstance = componentRef.instance as IDynamicComponent;
    dynamicInstance.data = adItem.data;
  }

  getAds() {
      this.interval = setInterval(() => {
        this.loadComponent();
      }, 3000);
  }
}
