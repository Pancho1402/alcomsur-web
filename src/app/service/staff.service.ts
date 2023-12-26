import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Workers } from '../model/workers.model';
import { MyHttpService } from '../my-http.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceStaff {
  private apiUrl = 'http://alcomsur-app:8080/api/trabajador';
  
  constructor(private http: HttpClient, private myHttpService: MyHttpService) {}
  getData(endPoint: string): Observable<Workers[]> {
    const headers:HttpHeaders = this.myHttpService.getHeaders();

    return this.http
      .get<Workers[]>(`${this.apiUrl}/${endPoint}`, { headers })
      .pipe(catchError(this.myHttpService.handleError));
  }

  postRegisterStaff(dataRegister: {
    nombre: string;
    idEmpresa: number;
  }): Observable<string> {
    return this.http
      .post(this.apiUrl, dataRegister, { responseType: 'text' })
      .pipe(catchError(this.myHttpService.handleError));
  }

  updateStaff(
    dataUpdate: { nombre: string; idEmpresa: number },
    id: number
  ): Observable<any> {
    const headers:HttpHeaders = this.myHttpService.getHeaders();
    return this.http
      .put(`${this.apiUrl}/${id}`, dataUpdate, { headers })
      .pipe(catchError(this.myHttpService.handleError));
  }

  deleteStaff(id: number): Observable<any> {
    const headers:HttpHeaders = this.myHttpService.getHeaders();

    return this.http
      .delete(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.myHttpService.handleError));
  }
}
