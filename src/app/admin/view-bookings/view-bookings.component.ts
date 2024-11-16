import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-bookings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './view-bookings.component.html',
  styleUrl: './view-bookings.component.css'
})
export class ViewBookingsComponent implements OnInit {
  bookings: any[] = []; 
  facilities: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Fetch the bookings data
    this.fetchBookings();
    this.fetchFacilities();
    this.assignFacilityNames();
  }

  fetchBookings(): void {
    
    this.http.get<any>('assets/bookings.json').subscribe((data) => {
      this.bookings = data.bookings;
    });
  }

  fetchFacilities(): void {
    // Fetch the facilities data from JSON
    this.http.get<any>('assets/dummy.json').subscribe((data) => {
      this.facilities = data.facilities;
    });
  }

  assignFacilityNames(): void {
    this.bookings.forEach(booking => {
      const facility = this.facilities.find(facility => facility.id === booking.facilityId);
      if (facility) {
        booking.facilityName = facility.name; 
      }
    });
  }
}
