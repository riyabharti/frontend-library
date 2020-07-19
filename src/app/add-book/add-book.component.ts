import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private notifier: NotifierService, private user: UsersService, private router: Router) { }

  nameid = '';
  authorid = '';
  isbnid = '';
  branch: any = [];
  branchvalue: boolean[] = [false, false, false, false, false, false];
  streams: any = ['CSE', 'IT', 'ME', 'ECE', 'EE', 'Civil'];
  totalid = 1;
  ngOnInit() {
  }
  submitForm(e: any) {
    for (let i = 0; i < this.branchvalue.length; i++) {
      if (this.branchvalue[i]) {
        this.branch.push(this.streams[i]);
      }
    }
    // console.log(this.branch)
    this.user.addBook({name: this.nameid, author: this.authorid, isbn: this.isbnid, total: this.totalid, branch: this.branch}).subscribe(
      data => {
        if (data.success) {
          this.notifier.notify('success', data.msg);
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
        }
      }
    );

  }

}
