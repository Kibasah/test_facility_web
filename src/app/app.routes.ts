import { Routes } from '@angular/router';
import { FacilityListComponent } from './components/facility-list/facility-list.component';
import { FacilityDetailComponent } from './components/facility-detail/facility-detail.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';


export const routes: Routes = [

    { path: '', component: FacilityListComponent },
    { path: 'facility/:id', component: FacilityDetailComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/panel', component: AdminPanelComponent }

]; // url routes


