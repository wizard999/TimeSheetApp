import { EmployeeTimeSheet } from './../models/timeSheet';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  base_url = 'api/Home';

  constructor(
    private http: HttpClient
  ) { }

  getEmployeeTimeSheets(): Observable<EmployeeTimeSheet[]> {
    return this.http.get<EmployeeTimeSheet[]>(this.base_url + '/GetEmployeeTimeSheets')
       .pipe(
        retry(1),
         catchError(this.handleError));
  }

  addTimeSheet(employeeTimeSheet: EmployeeTimeSheet): Observable<boolean> {
    return this.http.post<boolean>(this.base_url + '/AddTimeSheet', employeeTimeSheet)
      .pipe(
        retry(1),
        catchError(this.handleError));
  }


  handleError(error) {
    let errorMessage = '';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-Side Error: ${error.error.message}`;
    } else {
      errorMessage = `Server-Side Error: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
