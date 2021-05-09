import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalusersComponent } from './externalusers.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestViewComponent } from './request-view/request-view.component';
import { StaffDetailComponent } from './staff-view/staff-detail/staff-detail.component';
import { StaffViewComponent } from './staff-view/staff-view.component';
import { RequestDetailComponent } from './request-view/request-detail/request-detail.component';
import { ExternalSplashComponent } from './external-splash/external-splash.component';

const routes: Routes = [
  {
    // Root Path
    path: '',
    component: ExternalusersComponent,
    // Child routes, the External Splash is initially loaded
    children: [
      { path: '', component: ExternalSplashComponent },
      { path: 'addrequest', component: RequestFormComponent },
      { path: 'viewrequests', component: RequestViewComponent },
      { path: 'viewrequests/request/:id', component: RequestDetailComponent },
      { path: 'staff', component: StaffViewComponent },
      { path: 'staff/:id', component: StaffDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalusersRoutingModule {}
