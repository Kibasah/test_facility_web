import { Component, OnInit  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  imports: [CommonModule, FormsModule], 
  standalone: true,
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  returnUrl: string = '/'; 

  constructor(
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,  
    private location: Location  
  ) {}

  ngOnInit(): void {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    console.log('Login form submitted');
    if (this.username && this.password) {
      this.loginService.login(this.username, this.password).subscribe({
        next: (response) => {
          if (response.success) {
            console.log('Login successful');
            this.errorMessage = '';  

            const user = response.user;  

            if (user.category === 1) {
              // If the user is an admin, navigate to the admin panel
              this.router.navigate(['admin/panel']);  
            } else if (user.category === 2) {
              // If the user is a regular user, 
              this.location.back();  
            }
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

  onBack() {
    
    this.location.back();
    
  }
}

