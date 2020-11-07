import { NgModule, ɵAPP_ROOT } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
import { HomeComponent } from '../home/home.component';
import { BookListComponent } from '../book/book-list/book-list.component';
import { CounterComponent } from '../counter/counter.component';

const appRoutes: Routes = [
  // {
  //     path: 'main',
  //     component: LayoutComponent,
  //     children: [{
  //         path: 'dashboard',
  //         loadChildren: () => import('src/app/features/dashboard/dashboard.module').then(m => m.DashboardModule),
  //     }]
  // },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
    //loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
  },
  {
    path: 'counter',
    component: CounterComponent,
  },
  {
    path: 'fetch-data',
    component: FetchDataComponent,
  },
  {
    path: 'book',
    component: BookListComponent,
    //loadChildren: () => import('src/app/shared/error/error.module').then(m => m.ErrorModule)
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
