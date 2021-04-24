import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicantFormComponent } from './applicant-form/applicant-form.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RegistrationSuccessComponent } from './registration-success/registration-success.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'register', component: ApplicantFormComponent },
  { path: 'registrationcomplete', component: RegistrationSuccessComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
