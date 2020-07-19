import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private notifier: NotifierService, private user: UsersService, private router: Router) { }

  currentPasswordid: string;
  newPasswordid: string;
  confirmPasswordid: string;

  ngOnInit() {
  }

  submitForm(e: any) {
    if (this.newPasswordid !== this.confirmPasswordid) {
      this.notifier.notify('warning', 'Password does not match!!');
      e.target.reset();
    } else {
      this.user.changePassword({newpassword: this.newPasswordid, currentpassword: this.currentPasswordid}).subscribe(
        data => {
          if (data.success) {
            this.notifier.notify('success', 'Password Changed!');
            this.router.navigate(['/student']);
            e.target.reset();
          } else {
            this.notifier.notify('error', data.msg);
            e.target.reset();
          }
        },
        error => {
          console.log(error);
          if (error.status === 401) {
            this.notifier.notify('error', 'Unauthorised! Login to continue');
            localStorage.removeItem('token1');
            this.router.navigate(['/login']);
          } else {
            this.notifier.notify('error', 'Error in API');
          }
        }
      );
    }
  }

}
