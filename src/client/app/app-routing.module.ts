import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteListComponent }   from './route-list/route-list.component';
import {RouteDetailComponent} from './route-detail/route-detail.component';

const routes: Routes = [
  { path: 'trips/:id', component: RouteListComponent },
  { path: 'trips/:id/routes/:route_id', component: RouteDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
