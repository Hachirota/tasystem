import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantViewComponent } from './applicant-view/applicant-view.component';
import { InternalSplashComponent } from './internal-splash/internal-splash.component';

import { InternalusersComponent } from './internalusers.component';

const routes: Routes = [
  {
    path: '',
    component: InternalusersComponent,
    children: [
      { path: '', component: InternalSplashComponent },
      { path: 'applicants', component: ApplicantViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalusersRoutingModule {}
