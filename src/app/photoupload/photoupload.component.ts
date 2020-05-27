import { Component, OnInit } from '@angular/core';
import {FileUploader} from 'ng2-file-upload';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../models/Photo';
@Component({
  selector: 'app-photoupload',
  templateUrl: './photoupload.component.html',
  styleUrls: ['./photoupload.component.css']
})
export class PhotouploadComponent implements OnInit {

  constructor(private authService:AuthService,private aleritfyService:AlertifyService,private activatedRoute:ActivatedRoute) { }

  photos:Photo[]=[];
  uploader:FileUploader;

  hasBaseDropZoneOver=false;

  path:string="http://localhost:53147/";
  currentMain:Photo;
  currentUser:any;

  ngOnInit() {
    this.activatedRoute.params.subscribe(params=>{
      this.currentUser=params["userId"];
    })
    this.initializeUploader();
  }

  initializeUploader()
  {
    this.uploader=new FileUploader(
      {
        url:this.path+'userphoto/'+this.currentUser+'/photos',
        authToken:'Bearer '+localStorage.getItem('token'),
        isHTML5:true,
        allowedFileType:['image'],
        autoUpload:false,
        removeAfterUpload:true,

        maxFileSize:10*1024*1024

      }
    )
    this.uploader.onSuccessItem=(item,response,status,header)=>{

      if(response)
      {
        const res:Photo=JSON.parse(response);
        const photo={
          id:res.id,
          url:res.url,
          dateAdded:res.dateAdded,
          description:res.description,
          publicId:res.publicId,
          isMain:res.isMain,
          userId:res.userId
          
        }
        this.photos.push(photo);
      }
    }

  }
}
