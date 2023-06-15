import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UrlConstant } from 'src/app/core/constants/url.constant';
import { PagedResults } from 'src/app/core/models/common/response-page.model';
import { Student } from 'src/app/core/models/users/student.model';
import { HandlerErrorService } from '../../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.STUDENT;
   }

   getAll(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<Student>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<Student>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

   create(model: Student): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   update(model: Student, studentID: string): Observable<Student> {
    return this.http.put<Student>(this.apiUrl + `/${studentID}`, model)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   delete(studentID: string): Observable<Student> {
    return this.http.delete<Student>(this.apiUrl + `/${studentID}`)
    .pipe(catchError(this.handleErrorService.handleError));
   }
}
