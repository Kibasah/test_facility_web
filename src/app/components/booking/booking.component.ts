// src/app/components/booking-confirmation/booking-confirmation.component.ts
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BookingService } from '../../services/booking.service';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingConfirmationComponent {
  constructor(
    public dialogRef: MatDialogRef<BookingConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,  
    private bookingService: BookingService  
  ) {}
  
  onConfirm(): void {
    
    alert('Booking confirmed');
    this.dialogRef.close();  
   
  }
  
  onCancel(): void {
    this.dialogRef.close();  
  }
}
