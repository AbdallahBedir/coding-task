import { Component, OnInit,ViewEncapsulation,AfterViewInit,
  trigger,state,style,transition,animate} from '@angular/core';
import {FlickrService} from '../../services/flickr.service';
import 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation:ViewEncapsulation.None,
  animations:[
    // animate the search user result in tab4  
    trigger('results',[
      transition('void => *',[
        style({transform:'translatey(-150%)'}),animate(200)
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit ,AfterViewInit{
  
  comments:any[];
  Activityphotos:any[];
  tags:any[];
  searchedUser:any;

  constructor(private _flickrService:FlickrService){ }


  ngOnInit() {
    
  }

  ngAfterViewInit(){

    // *********** start get Comments in tab1 *********************
    this._flickrService.getComments().map(res => res.json())
      .subscribe(
        data => {
          if(!data) return;
          if(!data.items) return;
          this.comments=data.items.item;
        },
        error => console.log(`something went wrong while getting user comments`)
      );


      // *********** start get Activity photos in tab2  ******************
    this._flickrService.getActivityPhotos().map(x => x.json())
      .subscribe(
        data => {
          if(!data) return;
          if(!data.items) return;
          this.Activityphotos = data.items.item;
        },
        err => console.log(`something went wrong while getting Activity photos`)
      );

    
      // ************* start photo get tags in tab3 *************************
      this._flickrService.getTags().map(x => x.json())
      .subscribe(
        data => {
          if(!data) return;
          if(!data.who) return;
          if(!data.who.tags) return;
          this.tags = data.who.tags.tag;
        },
        err => console.log(`something went wrong while getting photo tags`)
      ); 
  } // end ngAfterViewInit method



    // ******* Handling click event on search user in tab4 **********
  searchUser(val:string){
      this._flickrService.getUser(val).map(x=>x.json()).subscribe(
        data =>{
          if(!data) return;
          if(data.message){
            this.searchedUser=data;
            return;  
          }
          this.searchedUser=data.user;
        },
        error => console.log(`error occur while searching user`)      
      )
  } //end searchUser method


}
