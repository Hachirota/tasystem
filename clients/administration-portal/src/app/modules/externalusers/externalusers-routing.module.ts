import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalusersComponent } from './externalusers.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestViewComponent } from './request-view/request-view.component';
import { StaffDetailComponent } from './staff-view/staff-detail/staff-detail.component';
import { StaffViewComponent } from './staff-view/staff-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalusersComponent,
    children: [
      { path: 'addrequest', component: RequestFormComponent },
      { path: 'viewrequests', component: RequestViewComponent },
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
