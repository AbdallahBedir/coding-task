import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from '@angular/material';
import 'hammerjs';
import { default as swal } from 'sweetalert2';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PhotosComponent } from './components/photos/photos.component'; 

import {FlickrService} from './services/flickr.service';
import {DashboardGuard} from './guards/dashboard.guard';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    PhotosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [FlickrService,DashboardGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
