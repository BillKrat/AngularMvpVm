import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponent } from './Poc/dynamic/dynamic.component';
import { DynamicContainerComponent } from './ioc-dynamic/dynamic-container/dynamic-container.component';
import { ViewRefDirective } from './ioc-dynamic/directives/view-ref.directive';
import { IocDynamicModule } from './ioc-dynamic/ioc-dynamic.module';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent,
    DynamicContainerComponent,
    ViewRefDirective
  ],
  entryComponents: [
    DynamicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IocDynamicModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})

export class AppModule { }
