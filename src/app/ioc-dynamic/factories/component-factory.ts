import { ComponentFactoryResolver } from '@angular/core';
import { ViewRefDirective } from '../directives/view-ref.directive';
import { IDynamicComponent } from '../Interfaces/idynamic-component';
import { ViewItem } from '../model/view-item';

export class ComponentFactory {
    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private viewRef: ViewRefDirective) { }

    resolveViewItem(view: ViewItem){
        const items = new Array<ViewItem>();
        items.push(view);
        this.resolveViewitems(items, 0);
    }

    resolveViewitems(views: ViewItem[], currentIndex: number) {
        if (this.componentFactoryResolver == null) { return; }

        const viewItem = views[currentIndex];

        const componentFactory = this.componentFactoryResolver
          .resolveComponentFactory(viewItem.component);

        const viewContainerRef = this.viewRef.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent(componentFactory);
        const dynamicInstance = componentRef.instance as IDynamicComponent;
        dynamicInstance.data = viewItem.data;
    }
}
