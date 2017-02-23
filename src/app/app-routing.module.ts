import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {DashboardGuard} from './guards/dashboard.guard';

const routes: Routes = [
  {path: '' , redirectTo:"Home",pathMatch:"full"},
  {path: 'Home' , component:HomeComponent},
  {path: 'dashboard' , component:DashboardComponent,canActivate:[DashboardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
