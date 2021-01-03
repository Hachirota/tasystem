import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExternalusersComponent } from './externalusers.component';
import { RequestFormComponent } from './request-form/request-form.component';

const routes: Routes = [
  {
    path: '',
    component: ExternalusersComponent,
    children: [{ path: 'addrequest', component: RequestFormComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExternalusersRoutingModule {}
