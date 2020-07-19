import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { IssueBookComponent } from '../issue-book/issue-book.component';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  constructor(private notifier: NotifierService, private user: UsersService, private router: Router) { }

  // book=""
  issuedBooks = [];
  // NEW in issue too
  username = '';
  libid = '';
  books;
  loading = true;

  // photo: File = undefined;

  imagePath: File = undefined;
  imgURL: any;
  public message = '';


  ngOnInit() {


    this.user.getBook().subscribe(
      data => {
        if (data.success) {
          this.books = data.data;
          this.libid = data.libid;
          this.username = data.name;
          this.user.bookIssued().subscribe(
            bookI => {
              if (bookI.success) {
                let i = 0;
                let a;
                this.issuedBooks = [];
                for (let j = 0; j < bookI.data.length; j++) {
                  if (this.books[i].isbn === bookI.data[j].isbn) {
                    a = this.books[i];
                    i++;
                    this.issuedBooks.push(a);
                  } else {
                    if (this.books[i].isbn < bookI.data[j].isbn) {
                      j--;
                      i++;
                    }
                  }
                }
                this.loading = false;
                // console.log(this.issuedBooks);
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

  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      this.imgURL = null;
      return;
    }

    this.message = '';
    const reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    // tslint:disable-next-line: variable-name
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  uploadPhoto() {
    console.log(this.imagePath);
    this.user.uploadProfilePhoto(this.imagePath).subscribe(
      data => {
        this.imgURL = null;
        if (data.success) {
          this.notifier.notify('success', 'Profile Photo Updated');
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

  // fileRead(e: FileList) {
  //     this.photo = e.item(0);
  //     console.log(this.photo);
  // }

  returnBook(i: any) {
    if (window.confirm('Are you sure to return \'' + this.issuedBooks[i].name + '\' Book?')) {
      this.user.decreaseIssued({name: this.issuedBooks[i].name}).subscribe(
        data => {
          if (data.success) {
            // this.loading=true;
            // this.notifier.notify('success',"Your book is returned")
            // this.ngOnInit();
            this.returnCommon(i);
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
  }
  returnCommon(i: any) {
    this.user.returnBook({isbn: this.issuedBooks[i].isbn}).subscribe(
      data => {
        if (data.success) {
          this.loading = true;
          this.notifier.notify('success', 'Your book is returned');
          this.ngOnInit();
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

 }
