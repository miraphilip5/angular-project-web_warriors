import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login-service.service';
import { RouterModule } from '@angular/router';

//mui libraries
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule, MatInputModule, MatFormFieldModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  _loginError = '';
  constructor(private fb: FormBuilder, private _loginService: LoginService, private router: Router) { }
  // ---------------
  loginForm = this.fb.group({
    email: ['sim@gmail.com', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  })

  onSubmit() {

    if (this.loginForm.invalid) return;
    console.log(this.loginForm.value);
    this._loginService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this._loginError = 'Invalid Credentials!';
        console.log(error);
      }
    });
  }
}
