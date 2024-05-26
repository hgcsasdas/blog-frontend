import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService,
  ) {}

  logout() {
    this.loginService.logout();
  }
}
