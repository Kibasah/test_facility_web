import { Component, OnInit } from '@angular/core';
import { FacilityService } from '../../services/facility.service'; 
import { Facility } from '../../model/facility.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manage-facilities',
  templateUrl: './manage-facilities.component.html',
  styleUrls: ['./manage-facilities.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class ManageFacilitiesComponent implements OnInit {
  facilities: Facility[] = [];
  slots: any[] = [];
  searchQuery: string = '';   

  constructor(private facilityService: FacilityService) {}

  ngOnInit(): void {
    // Fetching facilities and slots
    this.facilityService.getFacilities().subscribe((data: any) => {
      this.facilities = data.facilities;
      this.slots = data.slots;
      this.loadFacilityImages(); 
    });
  }

  // Method to load images for each facility
  loadFacilityImages() {
    this.facilities.forEach(facility => {
      const imgId = facility.img; 
      if (imgId) {
        
        facility.images = this.facilityService.getImagesById(imgId);
      }
    });
  }

  // Method to filter facilities based on search query
  filteredFacilities(searchQuery: string) {
    return this.facilities.filter(facility =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Example: Edit facility method
  editFacility(id: number): void {
    console.log('Editing facility with ID:', id);
    
  }

  // Example: Delete facility method
  deleteFacility(id: number): void {
    console.log('Deleting facility with ID:', id);
    
  }
}
