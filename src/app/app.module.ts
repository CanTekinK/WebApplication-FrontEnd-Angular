import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{ HttpClientModule } from '@angular/common/http';
import {RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppRoutes} from './routes';
import { NgxGalleryModule} from 'ngx-gallery';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import {AlertifyService} from './services/alertify.service'
import { HttpModule } from '@angular/http';



import {FileUploadModule} from 'ng2-file-upload'
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { NgxEditorModule } from 'ngx-editor';


import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserregisterComponent } from './users/userregister/userregister.component';
import { PhotouploadComponent } from './photoupload/photoupload.component';
import { ApplicationComponent } from './application/application.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { MessagesendComponent } from './messagesend/messagesend.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerloginComponent } from './manager/managerlogin/managerlogin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SpinnerComponent } from './spinner/spinner.component';
import { UsermessagesComponent } from './users/usermessages/usermessages.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    NavbarComponent,
    UserdetailComponent,
    UserregisterComponent,
    PhotouploadComponent,
    ApplicationComponent,
    UserloginComponent,
    UserupdateComponent,
    MessagesendComponent,
    ManagerComponent,
    ManagerloginComponent,
    SpinnerComponent,
    UsermessagesComponent
 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(AppRoutes),
    NgxGalleryModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TooltipModule.forRoot(),
  
    FileUploadModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    NgxEditorModule,

    MatProgressSpinnerModule,
    MatCardModule,
    ScrollingModule,
  
    

  ],
  providers: [AlertifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
