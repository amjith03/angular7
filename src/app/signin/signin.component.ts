import { Component, OnInit} from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ToasterService } from '../toaster.service';

@Component({
  selector: 'app-auth',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  registerForm: FormGroup;

  submitted = false;

  constructor(private formBuilder: FormBuilder, public restUser: CourseService, private route: ActivatedRoute,
     private router: Router) {
          }

  ngOnInit() {

      this.registerForm = this.formBuilder.group({
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(6)]],
      });

  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
        return;
    } else {
      console.log(this.registerForm.value);
      this.restUser.signin(this.registerForm.value).subscribe((result) => {
        if (result === 200) {
        // this.toast.Success(' Logged In ');
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', this.f.email.value);
        this.router.navigate(['/course']);
        } else {
         //  this.toast.Error('Unsuccessful Log in');
        }
        location.reload();

    }, (err) => {
      console.log(err);
      });
    }

  }

}




































// import { Component, OnInit, Input } from '@angular/core';
// import { CourseService } from '../course.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.scss']
// })
// export class SigninComponent implements OnInit {

//   form: FormGroup;
//   submitted = false;

//   @Input() user = { email: '', password: '' };

//   constructor(public rest: CourseService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) { }

//   ngOnInit() {
//     // this.signin();
//     this.form = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]],
//     });
//   }
//   get f() { return this.form.controls; }
//   signin() {
//     console.log(this.user);
//     this.rest.signin(this.user).subscribe((result) => {
//       console.log(result);
//       if (result === 200) {
//         localStorage.setItem('isLoggedIn', 'true');
//         localStorage.setItem('token', this.user.email);
//         this.router.navigate(['/course']);

//       }
//     }, (err) => {
//       console.log(err);
//     });
//   }

// }
