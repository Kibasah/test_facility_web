import { Component, Input } from '@angular/core';
import { LoginService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports: [CommonModule, FormsModule], 
  standalone: true,
})
export class LoginComponent {
  @Input() isLoginVisible: boolean = false;  // Receive the login visibility from the parent component
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private loginService: LoginService) {}

  // This method is called when the user submits the form
  onSubmit(): void {
    if (this.username && this.password) {
      this.loginService.login(this.username, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Login successful');
            this.errorMessage = '';  // Clear any previous error message
            // Perform additional actions, like navigating to a new page or storing the user session
          } else {
            this.errorMessage = response.message;  // Set the error message if login failed
          }
        },
        error: (err) => {
          this.errorMessage = 'An unexpected error occurred';  // Handle any other errors
          console.error('Login error:', err);
        }
      });
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
