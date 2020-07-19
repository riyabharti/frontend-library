import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationStudentComponent } from './registration-student/registration-student.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { UsersService } from './users.service';
import {NotifierModule} from 'angular-notifier';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AddBookComponent } from './add-book/add-book.component';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationStudentComponent,
    LoginStudentComponent,
    AddBookComponent,
    AdminLibraryComponent,
    IssueBookComponent,
    StudentDetailsComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // notifier properties can be written with .withConfig
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 20
        },
        vertical: {
          position: 'bottom',
          distance: 20,
          gap: 10
        }
      },
      theme: 'material',
      behaviour: {
        autoHide: 2000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 500,
          easing: 'ease'
        },
        hide: {
          preset: 'fade',
          speed: 1000,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    })
  ],
  providers: [UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthService,
    multi: true
    // Doubt
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
