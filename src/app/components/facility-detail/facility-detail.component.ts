import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacilityService } from '../../services/facility.service';
import { Facility } from '../../model/facility.model';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-facility-detail',
  templateUrl: './facility-detail.component.html',
  styleUrls: ['./facility-detail.component.css'],
  standalone: true,
  imports: [NavbarComponent, CommonModule],
})
export class FacilityDetailComponent implements OnInit {
  facilityId!: number;
  facility!: Facility;
  selectedImage: string = '';
  isOpen = false;
  selectedOption: string | null = null;
  timeslots: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private facilityService: FacilityService
  ) {}

  ngOnInit(): void {
    this.facilityId = +this.route.snapshot.paramMap.get('id')!;

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

        // Fetch timeslots for the facility
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

  bookFacility(){
    console.log("book");
  }
}
