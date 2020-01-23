import {Component, OnInit, OnDestroy, Input, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { ComponentFactory } from '../factories/component-factory';
import { ViewItem } from '../model/view-item';
import { Container } from 'src/app/ioc-container/container';
import { LifeTime } from 'src/app/ioc-container/interfaces';

import { Inject, Injectable } from '../../ioc-container/decorators';

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
    this.poc();
  }

  poc() {
    // class A {
    //   test: any;
    // }

    const container = new Container();

    @Injectable()
    class A {
        constructor(@Inject('d') private a: any) {}
    }
    container.register([{ token: 'IA', useClass: A }]);

    const throwableFunc = () => container.resolve('Fish');
    try {
      const fish = throwableFunc();
    } catch( err ) {
      console.log(err);
    }

    // expect(instance1).not.toEqual(instance2);

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
