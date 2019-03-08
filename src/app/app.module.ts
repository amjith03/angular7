import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseComponent } from './course/course.component';
import { FormsModule } from '@angular/forms';
import { InsertCourseComponent } from './insert-course/insert-course.component';
import { UpdateComponent } from './update/update.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { ToasterService } from './toaster-service.service';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

const appRoutes: Routes = [
  {
    path: 'course',
    component: CourseComponent,
    data: { title: 'Course List' }
  },
  {
    path: 'insert',
    component: InsertCourseComponent,
    data: { title: 'Insert Course' }
  },
  {
    path: 'update',
    component: UpdateComponent,
    data: { title: 'update course' }
  },
  {
    path: 'signin',
    component: SigninComponent,
    data: { title: 'signin' }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: { title: 'Sign up' }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: { title: 'logout' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'home' }
  },
  { path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  }

];

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    InsertCourseComponent,
    UpdateComponent,
    SignupComponent,
    SigninComponent,
    LogoutComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
