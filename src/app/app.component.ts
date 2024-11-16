import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Routes, RouterModule } from '@angular/router';
import { LoginService } from './services/auth.service';  // Import the LoginService
import { LoginComponent } from './admin/admin-login/admin-login.component';  // Import the LoginComponent



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CommonModule],  // Include LoginComponent here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'test_facility_web';
  isLoginVisible: boolean = true;  // Manage the login visibility state here

  constructor(private loginService: LoginService) {
    // Subscribe to login visibility changes from the LoginService
    this.loginService.loginVisible$.subscribe((visible: boolean) => {
      this.isLoginVisible = visible;
    });
  }

  // Optionally toggle login visibility based on a certain condition or button
  toggleLogin() {
    this.isLoginVisible = !this.isLoginVisible;
    this.isLoginVisible ? this.loginService.showLogin() : this.loginService.hideLogin();
  }
}
