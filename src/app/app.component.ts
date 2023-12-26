import { Component, OnInit } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  title = 'Alcomsur-web';
  isLoginPage:boolean = true;
  isComponentRouter:boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    
    const token = localStorage.getItem('token');
    if(!token){
      this.router.navigate(['login']);
      throw new Error('Token no encontrado');
    }
    else{
      this.router.navigate(['companyTable']);
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login' || event.url === '/';
        this.isComponentRouter = event.url != '/login' && event.url != '/';  
      }
    });
  }
}
