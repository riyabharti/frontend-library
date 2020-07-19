import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.css']
})
export class RegistrationStudentComponent implements OnInit {

  constructor(private notifier: NotifierService, private router: Router, private user: UsersService) { }

  fullname: string;
  regno: string;
  branch = 'Other';
  streams: any = ['CSE', 'IT', 'ME', 'ECE', 'EE', 'Civil', 'Other'];
  ngOnInit() {
    this.notifier.getConfig().position.horizontal.position = 'left';
    this.notifier.getConfig().position.vertical.position = 'top';
  }
  // submit registration
  submitForm(e: any) {
    if (localStorage.getItem('token1')) {
      this.notifier.notify('error', 'Sign out to Register!!');
      e.target.reset();
      this.router.navigate(['/login']);
      // Change link above
    } else {
      // e.target.reset(); it gets empty
      this.user.signup({regid: this.regno, name: this.fullname, branch: this.branch}).subscribe(
        data => {
          if (data.success) {
            this.notifier.notify('success', 'Account Created! Login to continue');
            this.notifier.notify('success','Default password is your registration id');
            this.router.navigate(['/login']);
          } else {
            this.notifier.notify('error', data.data + ' Try again with correct details');
          }
        },
        error => {
          console.log(error);
          this.notifier.notify('error', 'ERROR in api');
        }
      );
      e.target.reset();
    }
  }
}
