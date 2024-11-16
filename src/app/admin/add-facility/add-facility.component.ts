import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-facility',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-facility.component.html',
  styleUrl: './add-facility.component.css'
})
export class AddFacilityComponent {

  newFacility = {
    name: '',
    description: '',
    capacity: 0,
    imgUrl: ''
  };

  addFacility() {
    
    console.log(this.newFacility);
  }

}
