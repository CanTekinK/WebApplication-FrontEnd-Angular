import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {FormGroup,FormControl,Validators,FormBuilder} from "@angular/forms"
import { UserRegister } from 'src/app/models/UserRegister';
import { AlertifyService } from 'src/app/services/alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-userregister',
  templateUrl: './userregister.component.html',
  styleUrls: ['./userregister.component.css'],
  providers:[UserService]
})
export class UserregisterComponent implements OnInit {

  constructor(private userService:UserService,
    private formBuilder:FormBuilder,
    private router:Router
    ) { }

  currentResponse;
  
  user:UserRegister;
  userAddForm: FormGroup;

  createUserForm()
  {
    this.userAddForm=this.formBuilder.group({
      nameSurname:["",Validators.required],
      email:["",Validators.required],
      phoneNumber:["",Validators.required],
      password:["",Validators.required]
    })
  }
  ngOnInit() {
    this.createUserForm();
  }
  add()
  {
    if(this.userAddForm.valid)
    {
      this.user=Object.assign({},this.userAddForm.value);
      this.userService.RegisterUser(this.user);


    
      //this.router.navigateByUrl('/users');

    }

  }

}
