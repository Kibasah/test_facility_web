import { Component } from '@angular/core';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { RouterModule} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet, RouterModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

}
