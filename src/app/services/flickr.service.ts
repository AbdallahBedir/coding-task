import { Injectable } from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import {Http,Headers,Response,RequestOptions} from '@angular/http';
import {Router} from '@angular/router';
import 'rxjs';

@Injectable()
export class FlickrService {

  api_key = "cb1fd9045e993b8cb98b94f77af55069";
  secret= "eb125994342ea555";
  api_sign:any;
  token:any;
  flickrApi:string="https://api.flickr.com/services/rest/";

  constructor(private _http:Http,private _router:Router) { 

  }


  /************ Method that generates the hashed api_sig using md5-hash ************/
  generateSig(signature:string){
      return Md5.hashStr(signature);
  }


  // ********** logging to the application  ******************************
  login(){
    let signature = `${this.secret}api_key${this.api_key}permsdelete`;
    let newApiSign = this.generateSig(signature);
    this.api_sign=newApiSign;
    document.location.href=`http://flickr.com/services/auth/?api_key=${this.api_key}&perms=delete&api_sig=${newApiSign}`;  
  }

  // *************** getting the token *********************************
  getToken(frob:string){
    let signature = `${this.secret}api_key${this.api_key}formatjsonfrob${frob}methodflickr.auth.getTokennojsoncallback?`;
    let newApiSign  = this.generateSig(signature);
    this._http.get(`${this.flickrApi}?method=flickr.auth.getToken&format=json&api_key=${this.api_key}&frob=${frob}&api_sig=${newApiSign}&nojsoncallback=?`)
    .map(x => x.json())
    .subscribe(
      data => {
        if(!data) return;
        if(!data.auth) return ;
        this.token = data.auth.token._content;
        localStorage.removeItem("token");
        localStorage.setItem("token",this.token);
      },
      err => console.log(`Error while getting the token`)
    );
  }


  // ********************Deleting user photo using POST request ********************
  deletePhoto(id){
      let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
      let options = new RequestOptions({ headers: headers });
      let signature = `${this.secret}api_key${this.api_key}auth_token${localStorage.getItem('token')}formatjsonmethodflickr.photos.deletenojsoncallback?permsdeletephoto_id${id}`;
      let newApiSign  = this.generateSig(signature);
      let body=`method=flickr.photos.delete&perms=delete&photo_id=${id}&auth_token=${localStorage.getItem('token')}&format=json&api_key=${this.api_key}&api_sig=${newApiSign}&nojsoncallback=?`;
      return this._http.post(this.flickrApi,body,options);
  }

  // ********** getting photos to photos component using GET request****************
  getPhotos(){
      let signature = `${this.secret}api_key${this.api_key}auth_token${localStorage.getItem('token')}formatjsonmethodflickr.photos.getPopularnojsoncallback?`;
      let newApiSign  = this.generateSig(signature);
      return this._http.get(`${this.flickrApi}?method=flickr.photos.getPopular&auth_token=${localStorage.getItem('token')}&format=json&api_key=${this.api_key}&api_sig=${newApiSign}&nojsoncallback=?`);
  }


  // ********************** searching the users using GET request ****************
  getUser(username){
      let signature = `${this.secret}api_key${this.api_key}auth_token${localStorage.getItem('token')}formatjsonmethodflickr.people.findByUsernamenojsoncallback?username${username}`;
      let newApiSign  = this.generateSig(signature);
      return this._http.get(`${this.flickrApi}?method=flickr.people.findByUsername&username=${username}&auth_token=${localStorage.getItem('token')}&format=json&api_key=${this.api_key}&api_sig=${newApiSign}&nojsoncallback=?`);
  }


  // ********** getting photos tags using GET request****************
  getTags(){
      let signature = `${this.secret}api_key${this.api_key}auth_token${localStorage.getItem('token')}formatjsonmethodflickr.tags.getListUsernojsoncallback?`;
      let newApiSign  = this.generateSig(signature);
      return this._http.get(`${this.flickrApi}?method=flickr.tags.getListUser&auth_token=${localStorage.getItem('token')}&format=json&api_key=${this.api_key}&api_sig=${newApiSign}&nojsoncallback=?`);
  }


  // ********** getting user comments using GET request****************
  getComments(){
      let signature = `${this.secret}api_key${this.api_key}auth_token${localStorage.getItem('token')}formatjsonmethodflickr.activity.userCommentsnojsoncallback?permsread`;
      let newApiSign  = this.generateSig(signature);
      return this._http.get(`${this.flickrApi}?method=flickr.activity.userComments&auth_token=${localStorage.getItem('token')}&format=json&perms=read&api_key=${this.api_key}&api_sig=${newApiSign}&nojsoncallback=?`);
  }


  // ********** getting Activity photos using GET request****************
  getActivityPhotos(){
      let signature = `${this.secret}api_key${this.api_key}auth_token${localStorage.getItem('token')}formatjsonmethodflickr.activity.userPhotosnojsoncallback?permsreadtimeframe4d`;
      let newApiSign  = this.generateSig(signature);
      return this._http.get(`${this.flickrApi}?method=flickr.activity.userPhotos&timeframe=4d&auth_token=${localStorage.getItem('token')}&format=json&perms=read&api_key=${this.api_key}&api_sig=${newApiSign}&nojsoncallback=?`);
  }


 

}
