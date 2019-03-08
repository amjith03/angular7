import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {

  course: any = [];

  constructor(public rest: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getCourse();
  }

  getCourse() {
    this.course = [];
    this.rest.getCourse().subscribe((data: {}) => {
      console.log(data);
      this.course = data;
      console.log(this.course);
    });
  }

  insert() {
    this.router.navigate(['insert']);
  }

  update() {
    this.router.navigate(['update']);
  }

  delete(name) {
    this.rest.deleteCourse(name)
      .subscribe(res => {
          this.getCourse();
        }, (err) => {
          console.log(err);
        }
      );
  }

}
