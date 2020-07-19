import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {

  constructor(private user: UsersService, private router: Router, private notifier: NotifierService) { }
  books;
  libid = '';
  username = '';
  issuedBooks;
  loading = true;

  ngOnInit() {
    this.user.getBook().subscribe(
      data => {
        if (data.success) {
          this.books = data.data;
          this.libid = data.libid;
          this.username = data.name;
          this.loading = false;
        } else {
          this.notifier.notify('error', data.msg);
          this.loading = false;
        }
      },
      error => {
        console.log(error);
        if (error.status === 401) {
          this.notifier.notify('error', 'Unauthorised! Login to continue');
          localStorage.removeItem('token1');
          this.router.navigate(['/login']);
        }
        this.loading = false;
      }
    );
    this.user.bookIssued().subscribe(
      data => {
        if (data.success) {
          this.issuedBooks = data.data;
          // let obj = this.issuedBooks.find(o => o.isbn === 51);
          // console.log(obj);
        } else {
          this.notifier.notify('warning', data.msg);
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

  updateBook(i: any) {
    if (window.confirm('Are you sure to issue \'' + this.books[i].name + '\' book?')) {
      const find = this.issuedBooks.find(o => o.isbn === this.books[i].isbn);
      if (find !== undefined) {
        this.notifier.notify('warning', 'You cannot issue 2 same books!');
      } else if (this.issuedBooks.length >= 5) {
        this.notifier.notify('warning', 'Maximum Limit Reached!!');
      } else {
        this.user.issueBook({name: this.books[i].name}).subscribe(
          data => {
            if (data.success) {
              this.updateCommon(i);
              // this.notifier.notify('success',"Book Issued!!");
              // this.books[i].issued++;
              // this.issuedBooks.push(this.books[i].name)
            } else {
              this.notifier.notify('error', data.msg);
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
      // this.user.updateBook({'name':this.books[i].name}).subscribe(
      //   data=>{
      //     if(data.success){
      //       this.issueBook(i);
      //     }
      //     else{
      //       this.notifier.notify('warning',data.msg);
      //     }
      //   },
      //   error=>{
      //     console.log(error);
      //     if(error.status==401)
      //     {
      //       this.notifier.notify('error', 'Unauthorised! Login to continue');
      //       localStorage.removeItem('token1');
      //       this.router.navigate(['/login'])
      //     }
      //   }
      // )
    }
  }

  updateCommon(i: any) {
    this.user.updateBook({isbn: this.books[i].isbn}).subscribe(
      data => {
        if (data.success) {
          this.notifier.notify('success', 'Book Issued!!');
          this.books[i].issued++;
          this.issuedBooks.push(data.data);
        } else {
          this.notifier.notify('error', data.msg);
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

  // issueBook(i:any){
  //   this.user.issueBook({'name':this.books[i].name}).subscribe(
  //     data=>{
  //       if(data.success){
  //         this.notifier.notify('success',"Book Issued!!");
  //         this.books[i].issued++;
  //         // this.issuedBooks.push(this.books[i].name)
  //       }
  //       else{
  //         this.notifier.notify('error',data.msg)
  //       }
  //     },
  //     error=>{
  //       console.log(error);
  //       if(error.status==401)
  //       {
  //         this.notifier.notify('error', 'Unauthorised! Login to continue');
  //         localStorage.removeItem('token1');
  //         this.router.navigate(['/login'])
  //       }
  //     }
  //   )
  // }

}
