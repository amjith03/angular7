import { Component, OnInit, Input } from '@angular/core';
import { CourseService } from '../course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {

  @Input() course: any = { name: '', link: '', course_duration: '', price: null };

  constructor(public rest: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {

  }

  updateCourse() {
    console.log(this.course);
    this.rest.updateCourse(this.course).subscribe((result) => {
      this.router.navigate(['update']);
    }, (err) => {
      console.log(err);
    });
  }
}


