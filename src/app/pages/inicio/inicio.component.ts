import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { CommonModule } from '@angular/common';
import { FormLogInComponent } from '../../components/forms/form-log-in/form-log-in.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, RouterLink, FormLogInComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  isLoggedIn: boolean = false;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.loginService.userLoginOn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
}
