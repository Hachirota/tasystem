import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantDetailComponent } from './applicant-view/applicant-detail/applicant-detail.component';
import { ApplicantViewComponent } from './applicant-view/applicant-view.component';
import { InternalSplashComponent } from './internal-splash/internal-splash.component';

import { InternalusersComponent } from './internalusers.component';
import { RequestDetailComponent } from './request-view/request-detail/request-detail.component';

const routes: Routes = [
  {
    path: '',
    component: InternalusersComponent,
    children: [
      { path: '', component: InternalSplashComponent },
      { path: 'applicants', component: ApplicantViewComponent },
      {
        path: 'applicants/applicant/:id',
        component: ApplicantDetailComponent,
      },
      { path: 'requests/requestdetail', component: RequestDetailComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalusersRoutingModule {}
