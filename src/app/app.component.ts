import { Component } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private notifier: NotifierService, private router: Router, public user: UsersService) {}

  logout() {
    localStorage.removeItem('token1');
    this.notifier.notify('info', 'Logged Out!');
    this.router.navigate(['/login']);
  }
  
}
