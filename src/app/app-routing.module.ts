import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationStudentComponent } from './registration-student/registration-student.component';
import { LoginStudentComponent } from './login-student/login-student.component';
import { AdminLibraryComponent } from './admin-library/admin-library.component';
import { AddBookComponent } from './add-book/add-book.component';
import { StudentDetailsComponent } from './student-details/student-details.component';
import { IssueBookComponent } from './issue-book/issue-book.component';
import { CheckLoginGuard } from './check-login.guard';
import { CheckAdminGuard } from './check-admin.guard';
import { CheckLogoutGuard } from './check-logout.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {path: 'login', component: LoginStudentComponent, canActivate: [CheckLogoutGuard]},
  {path: 'register', component: RegistrationStudentComponent, canActivate: [CheckLogoutGuard]},
  {path: 'admin', component: AdminLibraryComponent, canActivate: [CheckLoginGuard, CheckAdminGuard]},
  {path: 'addBook', component: AddBookComponent, canActivate: [CheckLoginGuard, CheckAdminGuard]},
  {path: 'student', component: StudentDetailsComponent, canActivate: [CheckLoginGuard]},
  {path: 'issueBook', component: IssueBookComponent, canActivate: [CheckLoginGuard]},
  {path: 'changePassword', component: ChangePasswordComponent, canActivate: [CheckLoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
