import { Injectable } from '@angular/core';

declare  let alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService{

  constructor() { }
  success(Message:string)
  {
    alertify.success(Message);
  }
  error(Message:string)
  {
    alertify.error(Message);
  }
  warning(Message:string)
  {
    alertify.warning(Message);
  }
  message(Message:string)
  {
    alertify.message(Message);
  }
}
