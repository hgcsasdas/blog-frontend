import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http'; // Asegúrate de importar HttpClientModule
import { LoginService } from '../../../services/auth/login.service';
import { LoginRequest } from '../../../services/auth/requests/loginRequest';
import { LoadingPageComponent } from '../../loaders/loading-page/loading-page.component';
import { LoadingFormsComponent } from '../../loaders/loading-forms/loading-forms.component';
import { SuccessComponent } from '../../alerts/success/success.component';
import { ErrorComponent } from '../../alerts/error/error.component';

@Component({
  selector: 'app-form-log-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    LoadingFormsComponent,
    SuccessComponent,
    ErrorComponent,
  ],
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.css'],
})
export class FormLogInComponent implements OnInit {
  loginError: string = '';
  isLoading: boolean = false;
  isSuccess: boolean = true;
  showMessage: boolean = false;

  loginForm = this.formBuilder.group({
    user: ['', [Validators.required]],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  login() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          if (userData) {
            this.showMessage = true;
            this.isSuccess = true;
            this.isLoading = false;
          } else {
            this.isLoading = false;
          }
        },
        error: (errorData) => {
          this.showMessage = true;
          this.isSuccess = false;
          console.error(errorData);
          this.loginError = errorData;
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
          this.loginForm.reset();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      alert('Error al ingresar los datos.');
    }
  }

  get user() {
    return this.loginForm.controls['user'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
