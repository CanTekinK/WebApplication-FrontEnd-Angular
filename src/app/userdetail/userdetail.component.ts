import { Component, OnInit } from '@angular/core';
import{ActivatedRoute} from "@angular/router"
import { UserService } from '../services/user.service';
import { Message } from '../models/Message';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';

import { User } from '../models/User';
import { Photo } from '../models/Photo';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HtmlParser } from '@angular/compiler';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css'],
  providers:[UserService,AuthService]
})
export class UserdetailComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private userService:UserService,private formBuilder:FormBuilder,private authService:AuthService) { }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  userPhotoAddForm: FormGroup;
  htmlContent;
  messages:Message[]=[];
  

  photo:Photo;
  user:User;
  currentUserId:number;
  photos:Photo[]=[];
  ngOnInit() {

    this.activatedRoute.params.subscribe(params=>{
      this.GetUsersById(params["userId"]);
      this.GetPhotosByUser(params["userId"]);
      this.currentUserId=params["userId"];
      this.getMessagesByUser(params["userId"]);
    })
    this.createUserForm();
  }
  NgxGallery()
  {
    this.galleryOptions = [
      {
          width: '100%',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = this.getImages();
  }

  isAuthenticated()
  {
    
    if(this.currentUserId==this.authService.getCuurentUserId())
    {
      return true;
    }
    return false;
    
  }
  isOnline()
  {
    return this.authService.loggedIn();
  }


  createUserForm()
  {
    this.userPhotoAddForm=this.formBuilder.group({
     
      url:["",Validators.required]
    })
  }
  addUserPhoto()
  {
    if(this.userPhotoAddForm.valid)
    {
      this.photo=Object.assign({},this.userPhotoAddForm.value);
      this.photo.userId=this.currentUserId;
      this.photo.isMain=false;
      this.userService.addPhotoByUser(this.photo);
      console.log(this.photo.description+" "+this.photo.isMain+" "+this.photo.url+" ")
    }

  }
  

  GetUsersById(userId:number)
  {

    this.userService.getUsersById(userId,localStorage.getItem('token').toString()).subscribe(data=>
      {
        this.user=data;

      })


  }
  GetPhotosByUser(userId:number)
  {
    this.userService.getPhotosByUser(userId).subscribe(data=>
      {
        this.photos=data;
        this.NgxGallery();
      })
  }
  getImages()
  {
    const imageUrls=[];
    for(let i =0;i<this.photos.length;i++)
    {
      imageUrls.push({
        small:this.photos[i].url,
        medium:this.photos[i].url,
        big:this.photos[i].url
      })

    }
    return imageUrls;
  }
  getMessagesByUser(userId:number)
  {
    this.userService.getMessagesByUser(userId,this.authService.token).subscribe(data=>
      {
        this.messages=data;
      }
    );

  }

}
