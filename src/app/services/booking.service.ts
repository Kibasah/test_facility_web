
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  constructor(private http: HttpClient) {}

  // Pass Data
  saveBooking(bookingDetails: any): Observable<any> {

    return this.http.post('assets/bookingData.json', bookingDetails);
  }
}
