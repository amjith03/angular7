import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: boolean;

  constructor(public rest: CourseService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    if (  localStorage.getItem('isLoggedIn') === 'false') {
      this.router.navigate(['/signin']);
    }
    this.isLoggedIn$ = this.rest.isLoggedIn();
  }

}
