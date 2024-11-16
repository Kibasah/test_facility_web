import { Routes } from '@angular/router';
import { FacilityListComponent } from './components/facility-list/facility-list.component';
import { FacilityDetailComponent } from './components/facility-detail/facility-detail.component';
import { LoginComponent } from './admin/admin-login/admin-login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ManageFacilitiesComponent } from './admin/manage-facilities/manage-facilities.component';
import { AddFacilityComponent } from './admin/add-facility/add-facility.component';
import { ViewBookingsComponent } from './admin/view-bookings/view-bookings.component';


export const routes: Routes = [

    { path: '', component: FacilityListComponent },
    { path: 'facility/:id', component: FacilityDetailComponent },
    { path: 'login', component: LoginComponent },
    {
        path: 'admin/panel',
        component: AdminPanelComponent,
        children: [
          { path: 'manage-facilities', component: ManageFacilitiesComponent },
          { path: 'add-facility', component: AddFacilityComponent },
          { path: 'view-bookings', component: ViewBookingsComponent },
        ]
      },

];


