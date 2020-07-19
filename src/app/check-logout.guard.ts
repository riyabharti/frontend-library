import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from './users.service';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class CheckLogoutGuard implements CanActivate {
  constructor(private user: UsersService, private router: Router, private notifier: NotifierService) {}
  canActivate(): boolean {
    if (this.user.checkToken()) {
      this.notifier.notify('error', 'Log Out before to continue!!');
      this.router.navigate(['/student']);
      return false;
    } else {
      return true;
    }
  }
}
