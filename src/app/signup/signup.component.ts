import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from '../toaster-service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;

  @Input() user = { name: '', email: '', password: '', age: 0 };

  constructor(public rest: CourseService, private route: ActivatedRoute,
     private router: Router, private toasterservice: ToasterService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required, Validators.minLength(6)],
      age: ['', Validators.required]

    });
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
    console.log(this.user);
    this.rest.signUp(this.user).subscribe((result) => {
      this.toasterservice.success('signup successfully');
      this.router.navigate(['signup' + result]);
    }, (err) => {
      console.log(err);
    });
  }
}

}

