import { Component, OnInit } from '@angular/core';
import {Http,Headers} from '@angular/http';
import {FlickrService} from '../../services/flickr.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  frob:any;
  isLoggedIn:boolean=false;

  constructor(
              private _http:Http,
              private _flickrService:FlickrService,
              public  _activatedRoute:ActivatedRoute){

              this._activatedRoute.queryParams.subscribe(
                  params => 
                        {
                          if(!params['frob']) return;
                          this.frob=params['frob'];
                          this.isLoggedIn=true;
                          this._flickrService.getToken(this.frob);
                        }
              )
   }

  ngOnInit() {
    if(localStorage.getItem("token")){
        this.isLoggedIn =true;
    }
      
  }
  redirectToLOgin(){
      this._flickrService.login();
      return false;
  }
}
