
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MyHttpService } from '../my-http.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceQr {
  constructor(
    private http: HttpClient,
    private myHttpService: MyHttpService
    ) {}

  postRegisterQR(dataRegister:{ idTrabajador: number; idEmpresa: number }):  Observable<string> {
    
    const apiUrl= 'http://alcomsur-app:8080/api/termo';

    return this.http.post(apiUrl, dataRegister,  { responseType: 'text' }).pipe(
      catchError(this.myHttpService.handleError)
    );
  }

}
