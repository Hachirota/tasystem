import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalusersComponent } from './externalusers.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { RequestViewComponent } from './request-view/request-view.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalusersComponent,
    children: [
      { path: 'addrequest', component: RequestFormComponent },
      { path: 'viewrequests', component: RequestViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalusersRoutingModule {}
