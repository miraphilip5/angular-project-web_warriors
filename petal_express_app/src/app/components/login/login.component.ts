import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { environment } from '../../../enviroments/enviroments';

@Component({
  selector: 'app-login',
  standalone : true,
  imports : [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formData = {
    email: '',
    password: ''
  };
  isJustRegistered = false;
  loginError = '';

  //getting server url from the environment variable file
  private serverUrl = environment.serverUrl;

  constructor(private router: Router, private http: HttpClient) {}

  onSubmit() {
    // Remove the msg about registration successful when the login form is submitted
    this.isJustRegistered = false;

    const data = {
      email: this.formData.email,
      password: this.formData.password
    };

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };

    //calling login backend api i.e. http://localhost:8080/api/auth
    const serverUrl = `${environment.serverUrl}/api/auth`;

    this.http.post(serverUrl, data, options).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.loginError = 'Invalid Credentials!';
        console.log(error);
      }
    });
  }
}
