import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { UrlConstant } from '../../constants/url.constant';
import { PagedResults } from '../../models/common/response-page.model';
import { Account, CompanyAccountDTO, StudentAccountDTO, UniversityAccountDTO } from '../../models/users/account.model';
import { HandlerErrorService } from '../common/handler-error.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private handleErrorService: HandlerErrorService
  ) {
    this.apiUrl = UrlConstant.API.ACCOUNT;
   }

   getAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl)
    .pipe(catchError(this.handleErrorService.handleError));
   }

   getAllPaging(
    page: number,
    size: number,
    search?: string,
    sort?: string,
    column?: string
   ): Observable<PagedResults<Account>> {
    let params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('search', search ?? '')
    .set('sort', sort ?? '')
    .set('column', column ?? '');

    return this.http.get<PagedResults<Account>>(this.apiUrl + '/paging', { params })
    .pipe(catchError(this.handleErrorService.handleError));
   }

  //  create(model: Account): Observable<Account> {
  //   return this.http.post<Account>(this.apiUrl, model)
  //   .pipe(catchError(this.handleErrorService.handleError));
  //  }

   createAdmin(model: Account): Observable<Account> {
    return this.http.post<Account>(this.apiUrl + '/admin', model);
   }

   createStudent(model: StudentAccountDTO): Observable<Account> {
    return this.http.post<Account>(this.apiUrl + '/student', model);
   }

   createCompany(model: CompanyAccountDTO): Observable<Account> {
    return this.http.post<Account>(this.apiUrl + '/company', model);
   }

   createUniversity(model: UniversityAccountDTO): Observable<Account> {
    return this.http.post<Account>(this.apiUrl + '/university', model);
   }

   changeStatus(id: number): Observable<Account> {
    return this.http.delete<Account>(this.apiUrl + `/${id}`)
   }

  //  update(model: Account, id: number): Observable<Account> {
  //   return this.http.put<Account>(this.apiUrl + `/${id}`, model)
  //   .pipe(catchError(this.handleErrorService.handleError));
  //  }

  //  changeStatus(id: number): Observable<Account> {
  //   return this.http.delete<Account>(this.apiUrl + '/change-status' + `/${id}`)
  //   .pipe(catchError(this.handleErrorService.handleError));
  //  }

  //  delete(id: number): Observable<Account> {
  //   return this.http.delete<Account>(this.apiUrl + `/${id}`)
  //   .pipe(catchError(this.handleErrorService.handleError));
  //  }
}
