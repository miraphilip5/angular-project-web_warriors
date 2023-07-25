import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formData = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };
  validationError = '';

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    this.validationError = '';

    const { name, email, password, password2 } = this.formData;

    if (password && password.length < 6) {
      this.validationError = 'Password should be at least 6 characters long!';
      return;
    } else if (password2 !== password) {
      this.validationError = 'Passwords must match!';
      return;
    }

    const data = {
      name,
      email,
      password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers };

    //calling login backend api i.e. http://localhost:8080/api/user
    const serverUrl = `${environment.serverUrl}/api/user`;

    this.http.post(serverUrl, data, options).subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('isJustRegistered', 'true');
        this.router.navigate(['/login']);
      },
      (error) => {
        if (error && error.error && error.error.length) {
          this.validationError = error.error[0].msg;
        }
        console.log('error ', error);
      }
    );
  }
}
