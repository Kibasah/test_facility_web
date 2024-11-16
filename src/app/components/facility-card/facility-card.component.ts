import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facility-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './facility-card.component.html',
  styleUrls: ['./facility-card.component.css']
})
export class FacilityCardComponent {

  @Input() facility: any;
  imageIndex: number = 0;
  facilityImages: any;
  constructor(private router: Router) {}

  ngOnInit(): void {
    
    if (this.facility && this.facility.images) {
      this.imageIndex = 0;
    }
  }

  // Logic to cycle through images
  nextImage() {
    if (this.facility && this.facility.images) {
      this.imageIndex = (this.imageIndex + 1) % this.facility.images.length;
    }
  }

  navigateToFacility() {
    
    if (this.facility && this.facility.id) {
      this.router.navigate(['/facility', this.facility.id]);
    } else {
      console.error('Facility ID is missing or undefined');
    }
  }

  
}
