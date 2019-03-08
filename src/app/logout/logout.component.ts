import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(public rest: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }
  logout(): void {
    console.log('logout');
    this.rest.logout();
    location.reload();
    this.router.navigate(['/signin']);
  }
}
