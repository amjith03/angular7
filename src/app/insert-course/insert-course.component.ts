import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-insert-course',
  templateUrl: './insert-course.component.html',
  styleUrls: ['./insert-course.component.scss']
})
export class InsertCourseComponent implements OnInit {

  @Input() course = { name: '', link: '', course_duration: '', price: 0 };

  constructor(public rest: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  insertcourse() {
    console.log(this.course);
    this.rest.insertCourse(this.course).subscribe((result) => {
      this.router.navigate(['insert' + result]);
    }, (err) => {
      console.log(err);
    });
  }

}
