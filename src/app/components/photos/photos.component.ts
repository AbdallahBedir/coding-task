import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../services/flickr.service';
import 'rxjs';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos:any[];

  constructor(private _flickrService:FlickrService) { 

  }

  ngOnInit() {
      this._flickrService.getPhotos().map(x=>x.json())
      .subscribe(
        data => {
          this.photos=data.photos.photo;
        },
        error => console.log(`error while gettting photos`)
      )
  }

  DeletePhoto(id){
    this._flickrService.deletePhoto(id).map(x=>x.json()).subscribe(
      data => {},
      err => console.log(`error occured while deleteing photo`),
      () => {
        // to submit changes
        window.location.reload();
      }
    )
  }

}
