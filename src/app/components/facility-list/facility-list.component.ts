import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../../services/facility.service';
import { CommonModule } from '@angular/common';
import { FacilityCardComponent } from "../facility-card/facility-card.component";
import { NavbarComponent } from "../navbar/navbar.component";


@Component({
  selector: 'app-facility-list',
  standalone: true,
  imports: [CommonModule, FacilityCardComponent, NavbarComponent],
  templateUrl: './facility-list.component.html',
  styleUrls: ['./facility-list.component.css']
})
export class FacilityListComponent implements OnInit {
  facilities: any[] = [];
  slots: any[] = [];
  imageIndex: number = 0; 

  constructor(private facilityService: FacilityService) { }

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

  // Navigate to the next image
  nextImage() {
    if (this.facilities[0]?.images) {
      this.imageIndex = (this.imageIndex + 1) % this.facilities[0].images.length;
    }
  }

  // Navigate to the previous image
  previousImage() {
    if (this.facilities[0]?.images) {
      this.imageIndex = (this.imageIndex - 1 + this.facilities[0].images.length) % this.facilities[0].images.length;
    }
  }

  
}
