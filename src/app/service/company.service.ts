import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Company } from 'src/app/model/company.model';
import { MyHttpService } from '../my-http.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceCompany {
  private apiUrl: string = 'http://alcomsur-app:8080/api/empresas';
  
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}

  getData(): Observable<Company[]> {
    const headers:HttpHeaders = this.myHttpService.getHeaders();

    return this.http
      .get<Company[]>(this.apiUrl, { headers })
      .pipe(catchError(this.myHttpService.handleError));
  }
  postData(dataCompany: {
    empresa: string;
    representante: string;
  }): Observable<string> {
    return this.http
      .post(this.apiUrl, dataCompany, { responseType: 'text' })
      .pipe(catchError(this.myHttpService.handleError));
  }

  putData(
    dataUpdate: { empresa: string | undefined; representante: string | undefined },
    id: number | undefined
  ): Observable<any> {

    const headers:HttpHeaders = this.myHttpService.getHeaders();
    return this.http
      .put(`${this.apiUrl}/${id}`, dataUpdate, { headers })
      .pipe(catchError(this.myHttpService.handleError));
  }
  deleteData(id: number | undefined ): Observable<any> {
    const headers:HttpHeaders = this.myHttpService.getHeaders();
    return this.http
      .delete(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.myHttpService.handleError));
  }
}
