import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../enviroments/enviroments';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';


//angular mui imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  validationError = '';

  constructor(
    private router: Router,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    }, { validators: this.passwordMatchValidator });

    // Trigger the custom validation initially
    this.passwordMatchValidator(this.registrationForm);
  }

  onSubmit() {
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

    const serverUrl = `${environment.serverUrl}/api/user`;

    this.http.post(serverUrl, data, options).subscribe({
      next: (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('isJustRegistered', 'true');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        if (error && error.error && error.error.length) {
          this.validationError = error.error[0].msg;
        }
        console.log('error ', error);
      }
    });
  }

  // Custom validator to check if password and password2 match
  private passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password')?.value;
    const password2 = control.get('password2')?.value;
    return password === password2 ? null : { 'passwordMismatch': true };
  }
}