import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BookCloudService } from './book/services/book-cloud.service';
import { BookService } from './book/services/book.service';
import { BookDeviceService } from './book/services/book-device.service';
import { Provider } from '@angular/compiler/src/core';

var providersDal:Provider[] = new Array<Provider>([
  { provide: "Device", useClass: BookDeviceService },
  { provide: "Cloud", useClass: BookCloudService },
  { provide: "Default", useClass: BookService }
]);

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
    ])
  ],
  providers: [providersDal],
  bootstrap: [AppComponent]
})
export class AppModule { }
