import { Component } from '@angular/core';
import { FormLogInComponent } from '../../components/forms/form-log-in/form-log-in.component';
import { FormRegisterComponent } from '../../components/forms/form-register/form-register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormLogInComponent, FormRegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  login = false;

  toggleCard() {
    this.login = !this.login;
  }
}
