import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../services/flickr.service';
import 'rxjs';
import {Router} from '@angular/router';
import { default as swal } from 'sweetalert2'


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photos:any[];

  constructor(private _flickrService:FlickrService,public router:Router) { 

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
  updatePhoto(){
    swal('Sorry updating photo command is not completed yet')
      .then(value => {},reason =>{});
  }
  DeletePhoto(id){
    swal({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
    }).then( (value)=>{
          this._flickrService.deletePhoto(id).map(x=>x.json()).subscribe(
                data => {},
                err => console.log(`error occured while deleteing photo`),
                () => {
                  // to submit changes
                  //window.location.reload();
                  this.router.navigate(['/']);
                  //location.reload() is commented because of github root issues
                }
          );
          swal(
            'Deleted!',
            'Your photo has been deleted.',
            'success'
          )},(reason)=>{         
            return false;
      })
    
  } // end deletePhoto() method

}

  
  