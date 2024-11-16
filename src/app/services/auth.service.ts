import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private apiUrl = 'assets/dummy.json'; 
  private loginVisibleSubject = new BehaviorSubject<boolean>(false); 
  loginVisible$ = this.loginVisibleSubject.asObservable(); 
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    return this.http.get<any>(this.apiUrl).pipe(
      map((data) => {

        const user = data.user.find(
          (user: { username: string; password: string }) =>
            user.username === username && user.password === password
        );

        if (user) {

          this.currentUserSubject.next(user);
          return { success: true, user };
        } else {

          throw new Error('Invalid username or password');
        }
      }),
      catchError((err) => {
        return of({ success: false, message: err.message });
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
  }

  showLogin(): void {
    this.loginVisibleSubject.next(true);
  }

  hideLogin(): void {
    this.loginVisibleSubject.next(false);
  }
}
