import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {FlickrService} from '../services/flickr.service';

@Injectable()
export class DashboardGuard implements CanActivate {

  constructor(private _flickrService:FlickrService) {

  }

  canActivate() {
      return localStorage.getItem("token") == null ? false :true;
  }
}