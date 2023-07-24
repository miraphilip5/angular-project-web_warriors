import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'petal_express_app';
  isLoginRoute(): boolean {
    // Check if the current route is the login route
    return this.router.url === '/login';
  }
}
