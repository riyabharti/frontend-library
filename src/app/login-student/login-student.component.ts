import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-login-student',
  templateUrl: './login-student.component.html',
  styleUrls: ['./login-student.component.css']
})
export class LoginStudentComponent implements OnInit {

  constructor(private notifier: NotifierService, private router: Router, private user: UsersService) { }
  emailid: '';
  password: '';
  // fullname: string;
  // email: string;
  // branch: string;
  // streams:any=['CSE','IT','ME','ECE','EE','Other']
  ngOnInit() {
  }

  // loginformreset(){
  //   this.emailid="";
  //   this.password="";
  // }

  // signupformreset(){
  //   this.fullname="";
  //   this.email="";
  //   this.branch="";
  // }
  // submit login form
  submitForm(e: any) {
    if (localStorage.getItem('token1')) {
      this.notifier.notify('error', 'Log out before to Sign in!');
      this.router.navigate(['/student']);
      e.target.reset();
    } else {
      this.user.login({regid: this.emailid, password: this.password}).subscribe(
        data => {
          if (data.success) {
            // console.log(data.success);
            this.notifier.notify('success', 'Logged In');
            this.router.navigate(['/student']);
            // if (data.msg.profilePath != '') {
            //   console.log(data.msg.profilePath);
            //   localStorage.setItem('photoUrl', data.msg.profilePath);
            // }
            localStorage.setItem('token1', data.token);
            e.target.reset();
          } else {
            this.notifier.notify('error', data.msg);
            e.target.reset();
          }
        },
        error => {
          console.log(error);
          this.notifier.notify('error', 'Error in calling API');
        }
      );
      e.target.reset();
    }
  }


}
