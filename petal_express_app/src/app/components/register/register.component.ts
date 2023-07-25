import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroments';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup; // Declare the FormGroup variable
  validationError = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder // Inject the FormBuilder
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.validationError = '';

    if (this.registrationForm.invalid) {
      this.validationError = 'Please fix the form errors';
      return;
    }

    const data = {
      name: this.registrationForm.value.name,
      email: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
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
