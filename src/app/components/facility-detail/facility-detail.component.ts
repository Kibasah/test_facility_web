import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../model/facility.model';
import { NavbarComponent } from "../navbar/navbar.component";
import { MatDialogModule, MatDialog  } from '@angular/material/dialog';
import { BookingConfirmationComponent } from '../booking/booking.component';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../services/auth.service';

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule, MatDialogModule, FormsModule],
})
export class FacilityDetailComponent implements OnInit {
  facilityId!: number;
  facility!: Facility;
  selectedImage: string = '';
  isOpen = false;
  selectedOption: string | null = null;
  timeslots: string[] = [];
  selectedDate: string = '';
  currentUser: any = null; 


  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService,
    private loginService: LoginService,
    private dialog: MatDialog
    
  ) {}

  ngOnInit(): void {
    this.facilityId = +this.route.snapshot.paramMap.get('id')!;

    this.loginService.currentUser$.subscribe((user) => {
      this.currentUser = user; 
    });

    this.facilityService.getFacilities().subscribe((data) => {
      const foundFacility = data.facilities.find(
        (facility: Facility) => facility.id === this.facilityId
      );

      if (foundFacility) {
        this.facility = foundFacility;
        this.facility.images = this.facilityService.getImagesById(this.facility.img);
        if (this.facility.images.length > 0) {
          this.selectedImage = this.facility.images[0];
        }

        
        const facilitySlots = data.slots.find(
          (slot: { facilityId: number; timeSlots: string[] }) =>
            slot.facilityId === this.facilityId
        );
        this.timeslots = facilitySlots ? facilitySlots.timeSlots : [];
      } else {
        console.error(`Facility with ID ${this.facilityId} not found.`);
        this.facility = {
          id: 0,
          name: 'Unknown Facility',
          description: 'Details not available.',
          available: false,
          img: 0,
          images: [],
        };
      }
    });
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.isOpen = false;
  }

  setSelectedImage(image: string) {
    this.selectedImage = image;
  }

  bookFacility(): void {
    if (!this.selectedDate || !this.selectedOption) {
      alert('Please select a date and a timeslot.');
      return;
    }
  
    const bookingDetails = {
      username: this.currentUser?.username || 'Guest',
      facilityName: this.facility.name,
      date: this.selectedDate,
      timeslot: this.selectedOption,
    };
  
    this.dialog.open(BookingConfirmationComponent, {
      data: bookingDetails,
      width: '50vw',
      maxWidth: '350px',
      height: '32vh',
      position: {
        bottom: '25px',
        right: '2%' 
      },
      backdropClass: 'blurred-backdrop'
    });
    
  }
} 
