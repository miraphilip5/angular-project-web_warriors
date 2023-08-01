import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private router: Router) {}

  handleLogout() {
    // Perform logout logic and remove the token from local storage
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
