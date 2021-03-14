import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantDetailComponent } from './applicant-view/applicant-detail/applicant-detail.component';
import { ApplicantViewComponent } from './applicant-view/applicant-view.component';
import { InternalSplashComponent } from './internal-splash/internal-splash.component';

import { InternalusersComponent } from './internalusers.component';
import { RegisterPortalUserComponent } from './register-portal-user/register-portal-user.component';
import { RequestDetailComponent } from './request-view/request-detail/request-detail.component';
import { RequestViewComponent } from './request-view/request-view.component';

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
      { path: 'requests', component: RequestViewComponent },
      { path: 'requests/request/:id', component: RequestDetailComponent },
      {
        path: 'portalusers/createuser',
        component: RegisterPortalUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InternalusersRoutingModule {}
