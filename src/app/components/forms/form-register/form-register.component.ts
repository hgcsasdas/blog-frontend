import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { RegisterService } from '../../../services/auth/register.service';
import { RegisterRequest } from '../../../services/auth/requests/registerRequest';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoadingFormsComponent } from '../../loaders/loading-forms/loading-forms.component';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule,
    LoadingFormsComponent,
  ],
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css'],
})
export class FormRegisterComponent implements OnInit {
  errorMessage: string = '';
  successMessage: string = '';
  registerForm = this.formBuilder.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {}

  register() {
    this.errorMessage = '';
    this.successMessage = '';
    this.isLoading = true;

    if (this.registerForm.valid) {
      this.errorMessage = '';
      this.registerService
        .register(this.registerForm.value as RegisterRequest)
        .subscribe({
          next: (response) => {
            if (response.register) {
              this.successMessage = response.message;
              this.registerForm.reset();
              this.isLoading = false;
            } else {
              this.isLoading = false;
              this.errorMessage = response.message;
            }
          },
          error: (error) => {
            console.error(error);
            this.isLoading = false;

            this.errorMessage =
              'Error al registrar. Por favor, inténtalo de nuevo.';
          },
        });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos.';
    }
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get password() {
    return this.registerForm.controls.password;
  }

  get email() {
    return this.registerForm.controls.email;
  }
}
