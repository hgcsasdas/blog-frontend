import { Component, OnInit } from "@angular/core";
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http"; // Asegúrate de importar HttpClientModule
import { LoginService } from "../../../services/auth/login.service";
import { LoginRequest } from "../../../services/auth/requests/loginRequest";

@Component({
  selector: 'app-form-log-in',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive,
    HttpClientModule
  ],
  templateUrl: './form-log-in.component.html',
  styleUrls: ['./form-log-in.component.css']
})
export class FormLogInComponent implements OnInit {
  loginError: string = '';

  loginForm = this.formBuilder.group({
    user: ['', [Validators.required,]],
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
      this.loginError = "";
      console.log(this.loginForm.value as LoginRequest);

      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next: (userData) => {
          // El userData es el token que me genera
          console.log(userData);
        },
        error: (errorData) => {
          console.error(errorData);
          this.loginError = errorData;
        },
        complete: () => {
          this.loginForm.reset();
        }
      })
    } else {
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  get user() {
    return this.loginForm.controls['user'];
  }

  get password() {
    return this.loginForm.controls['password'];
  }
}
