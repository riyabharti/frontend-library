import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {
  
  constructor(private user:UsersService,private router:Router){}

  canActivate(): boolean{
    if(!this.user.checkToken()){
      this.router.navigate(['/login']);
      return false;
    }
    else
      return true;
  }  
}
