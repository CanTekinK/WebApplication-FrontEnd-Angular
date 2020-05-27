import { UsersComponent } from './users/users.component';
import { Routes } from '@angular/router';
import { UserdetailComponent } from './userdetail/userdetail.component';
import { UserRegister } from './models/UserRegister';
import { User } from './models/User';
import { UserregisterComponent } from './users/userregister/userregister.component';
import { ApplicationComponent } from './application/application.component';
import { UserloginComponent } from './userlogin/userlogin.component';
import { UserupdateComponent } from './userupdate/userupdate.component';
import { MessagesendComponent } from './messagesend/messagesend.component';
import { ManagerloginComponent } from './manager/managerlogin/managerlogin.component';
import { ManagerComponent } from './manager/manager.component';
import { UsermessagesComponent } from './users/usermessages/usermessages.component';

export const AppRoutes: Routes=[
    {path:"application",component:ApplicationComponent},
    {path:"application/userlogin",component:UserloginComponent},
    {path:"messagesend",component:MessagesendComponent},
    {path:"application/managerlogin",component:ManagerloginComponent},
    {path:"manager/:managerId",component:ManagerComponent},
    {path:"users",component:UsersComponent},
    {path:"usersdetails/:userId/update",component:UserupdateComponent},
    {path:"usersdetails/:userId",component:UserdetailComponent},
    {path:"users/add",component:UserregisterComponent},
    {path:"usersdetails/:userId/messages",component:UsermessagesComponent},
    {path:"",redirectTo:"application",pathMatch:"full"}
]