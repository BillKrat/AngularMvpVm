import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DynamicComponent } from './Poc/dynamic/dynamic.component';
import { DynamicContainerComponent } from './Poc/dynamic-container/dynamic-container.component';
import { DynamicHostDirective } from './Poc/dynamic-host.directive';

@NgModule({
  declarations: [
    AppComponent,
    DynamicComponent,
    DynamicContainerComponent,
    DynamicHostDirective
  ],
  entryComponents: [
    DynamicComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
