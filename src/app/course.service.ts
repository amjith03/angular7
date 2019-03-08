import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://localhost:3004';
  const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  responseStatus: any;

  constructor(private http: HttpClient) {
    this.http = http;
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  getCourse(): Observable<any> {
    return this.http.get(endpoint + '/course').pipe(
      map(this.extractData));
  }

  getCours(name): Observable<any> {
    return this.http.get(endpoint + '/course/:' + name).pipe(
      map(this.extractData));
  }

  insertCourse (course): Observable<any> {
    console.log(course);
    return this.http.post<any>(endpoint + '/course/insert', JSON.stringify(course), httpOptions).pipe(map(this.extractData));
  }

  updateCourse (course): Observable<any> {
    console.log(course);
    return this.http.put(endpoint + '/course/update' + name, JSON.stringify(course), httpOptions).pipe(
      tap(_ => console.log(`updated course name=${course.name}`)),
      catchError(this.handleError<any>('updateCourse'))
    );
  }

  deleteCourse (name): Observable<any> {
    return this.http.delete<any>(endpoint + `/course/delete/${name}`).pipe(
      catchError((error: HttpErrorResponse) => {
        return [{status: error}];
      }));
  }

  signin (user): Observable<any> {
    console.log(user);
    return this.http.post<any>(endpoint + '/signin', user, httpOptions).pipe(map((res) => {
      return this.responseStatus = res.status;
    }));
  }

  signUp (user): Observable<any> {
    console.log(user);
    return this.http.post<any>(endpoint + '/signup', JSON.stringify(user), httpOptions).pipe(map(this.extractData));
  }

  logout(): void {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    let status = false;
      if ( localStorage.getItem('isLoggedIn') === 'true') {
      status = true;
      } else {
      status = false;
      }
    return status;
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  }
