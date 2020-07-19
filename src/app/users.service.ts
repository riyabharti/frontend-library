import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiURL;
  // baseUrl: string = 'https://ebe74235.ngrok.io/';
  // Register
  signup(userdata) {
    return this.http.post<any>(this.baseUrl + 'users/reg', userdata);
  }

  // Login
  login(userdata) {
    return this.http.post<any>(this.baseUrl + 'users/login', userdata);
  }

  // Change Password
  changePassword(Password) {
    return this.http.post<any>(this.baseUrl + 'users/changePass', Password);
  }

  // Add the amount of book
  addBook(bookdata) {
    return this.http.post<any>(this.baseUrl + 'users/addBook', bookdata);
  }

  // Get all Books
  getBook() {
    return this.http.get<any>(this.baseUrl + 'users/getBook');
  }

  // Issue Book
  issueBook(bookname) {
    return this.http.post<any>(this.baseUrl + 'users/issue', bookname);
  }

  // Update Book 2nd is from 3rd table
  updateBook(bookdetail) {
    // return this.http.post<any>(this.baseUrl+'users/updateBook',bookdetail);
    return this.http.post<any>(this.baseUrl + 'users/stubookissue', bookdetail);
  }

  // Return and update for student in 3rd table
  returnBook(bookdetail) {
    // return this.http.post<any>(this.baseUrl+'users/returnBook',bookdetail)
    return this.http.post<any>(this.baseUrl + 'users/stubookReturn', bookdetail);
  }

  // Decrease No of issued books
  decreaseIssued(bookname) {
    return this.http.post<any>(this.baseUrl + 'users/decreaseIssued', bookname);
  }

  // Get no of issued books
  bookIssued() {
    return this.http.get<any>(this.baseUrl + 'users/stubookFind');
  }

  // Upload Profile Photo
  uploadProfilePhoto(imageFile: File) {
    const formData = new FormData();
    formData.append('photo', imageFile, imageFile.name);
    return this.http.post<any>(this.baseUrl + 'users/uploadProfile', formData);
  }

  // student details
  // userDetail(){
  //   return this.http.get<any>(this.baseUrl+'users/detail');
  // }

  // Check token i.e Login
  checkToken(): boolean {
    return !!localStorage.getItem('token1');
  }

  // Check Admin
  checkAdmin(): string {
    return localStorage.getItem('admin');
  }
}
