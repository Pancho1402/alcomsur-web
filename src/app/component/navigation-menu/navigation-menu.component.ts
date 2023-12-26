import { Component } from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import { MyHttpService } from 'src/app/my-http.service';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent {
  isLoginPage = true;

  constructor(
    private router: Router,
    private myservice:MyHttpService
    ) {}

  ngOnInit():void{
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login' || event.url === '/' ? false : true; 
      }
    });
  }
  clearAuthToken():void{
    this.myservice.clearAuthToken();
    this.router.navigate(['/login']);
  }

}
