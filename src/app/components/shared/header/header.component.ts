import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.userLoginOn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  logout() {
    this.loginService.logout();
  }
}
