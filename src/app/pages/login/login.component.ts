import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/users.model';
import { AuthService } from 'src/app/service/login.service';

import { MyHttpService } from 'src/app/my-http.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isVisibleAlertEmail: boolean = false;
  isVisibleAlertPassword: boolean = false;

  textErrorAlertEmail: string = '';
  textErrorAlertPassword: string = '';
  
  bsModalRef: BsModalRef | null = null;

  constructor(
    private router: Router,
    private myHttpService: MyHttpService,
    private authService: AuthService,
    private modalService: BsModalService
  ) {}

  user: User = {
    name: '',
    email: '',
    password: '',
    repeatPassword: ''
  };

  goToMainPage() {
    const email: string = this.user.email;
    const password: string = this.user.password;

    if (email !== '' && password !== '') {
      if (password.length >= 8) {
        this.isVisibleAlertEmail = false;
        this.isVisibleAlertPassword = false;
        
        this.authenticate();

      } else {
        this.textErrorAlertPassword =
          'Error, no puede ser menor a ocho caracteres';
      }
    } else {
      this.textErrorAlertEmail = 'Error, no puede estar vacío el email';
      this.textErrorAlertPassword =
        password.length < 8 && password === ''
          ? 'Error, no puede estar vacío el password'
          : 'Error, no puede ser menor a ocho caracteres';
    }

    this.isVisibleAlertEmail = email === '';
    this.isVisibleAlertPassword = password === '' || password.length < 8;
  }
  authenticate():void {
    const credentials = { email: this.user.email, password: this.user.password };

    this.myHttpService.authenticate(credentials).subscribe(
      (jwt: string) => {

        if(jwt){
          localStorage['token'] = jwt;
          this.router.navigate(['companyTable']);
        }
      },
      (error: HttpErrorResponse | string) => {
        console.error('Error en la autenticación', error);
      }
    );
  }
}
