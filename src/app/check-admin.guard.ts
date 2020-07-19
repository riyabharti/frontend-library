import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsersService } from './users.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class CheckAdminGuard implements CanActivate {
  
  constructor(private user:UsersService,private notifier: NotifierService){}
  canActivate(): boolean{
    if(this.user.checkAdmin()!='riya'){
      this.notifier.notify('info',"Only Admin are allowed to access this portal");
      return false;
    }
    else{
      return true;
    }
  }
}
