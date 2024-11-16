import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../../services/facility.service';
import { CommonModule } from '@angular/common';
import { FacilityCardComponent } from "../facility-card/facility-card.component";
import { NavbarComponent } from "../navbar/navbar.component";
import { Router } from '@angular/router';
import { Facility } from '../../model/facility.model';

@Component({
  selector: 'app-facility-list',
  standalone: true,
  imports: [CommonModule, FacilityCardComponent, NavbarComponent],
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {
  facilities: Facility[] = [];
  slots: any[] = [];
  currentFacilityIndex: number = 0;

  constructor(private facilityService: FacilityService, private router: Router) {}

  ngOnInit(): void {
    this.facilityService.getFacilities().subscribe((data) => {
      this.facilities = data.facilities;
      this.slots = data.slots;
      this.loadFacilityImages();
    });

    

    
  }

  loadFacilityImages() {
    this.facilities.forEach(facility => {
      const imgId = facility.img;
      if (imgId) {
        facility.images = this.facilityService.getImagesById(imgId);
      }
    });
  }

  // Navigate to the next facility's second image
  nextImage() {
    if (this.facilities.length > 0) {
      // Increment the current facility index
      this.currentFacilityIndex = (this.currentFacilityIndex + 1) % this.facilities.length;
    }
  }

  // Navigate to the previous facility's second image
  previousImage() {
    if (this.facilities.length > 0) {
      // Decrement the current facility index
      this.currentFacilityIndex =
        (this.currentFacilityIndex - 1 + this.facilities.length) % this.facilities.length;
    }
  }

  // Get the second image of the current facility
  getCurrentImage(): string | undefined {
    const currentFacility = this.facilities[this.currentFacilityIndex];
    return currentFacility?.images?.[1]; // Second image (index 1)
  }

  scrollToFacility(facilityId: number): void {
    // Navigate to the fragment corresponding to the facility ID
    this.router.navigate([], {
      fragment: `facility-${facilityId}` // Add the fragment to the URL
    });
  }
}
