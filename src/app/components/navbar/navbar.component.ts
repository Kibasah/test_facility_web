import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/auth.service';
import { RouterModule, Router  } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  currentUser: any = null; 

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.currentUser$.subscribe((user) => {
      this.currentUser = user; 
    });
  }

  logout(): void {
    this.loginService.logout();
    this.router.navigate(['/']); 
  }
}
