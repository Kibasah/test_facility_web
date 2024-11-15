import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl = 'assets/dummy.json';  // Path to your dummy data file
  private loginVisibleSubject = new BehaviorSubject<boolean>(false); // Initial visibility is false
  loginVisible$ = this.loginVisibleSubject.asObservable(); // Observable to share visibility state

  constructor(private http: HttpClient) {}

  // Login method to verify username and password against dummy data
  login(username: string, password: string): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {
        // Find user in dummy data based on username and password
        const user = data.user.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password
        );

        if (user) {
          return { success: true, user };  // Successful login
        } else {
          throw new Error('Invalid username or password');  // Invalid login
        }
      }),
      catchError((err) => {
        return of({ success: false, message: err.message });
      })
    );
  }

  // Method to show login form
  showLogin(): void {
    this.loginVisibleSubject.next(true);
  }

  // Method to hide login form
  hideLogin(): void {
    this.loginVisibleSubject.next(false);
  }
}
