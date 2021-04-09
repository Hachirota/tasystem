import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { InternalusersRoutingModule } from './internalusers-routing.module';
import { InternalusersComponent } from './internalusers.component';
import { MatListModule } from '@angular/material/list';
import { ApplicantViewComponent } from './applicant-view/applicant-view.component';
import { InternalSplashComponent } from './internal-splash/internal-splash.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestViewComponent } from './request-view/request-view.component';
import { RequestDetailComponent } from './request-view/request-detail/request-detail.component';
import { ApplicantDetailComponent } from './applicant-view/applicant-detail/applicant-detail.component';
import { RegisterPortalUserComponent } from './register-portal-user/register-portal-user.component';
import { MatchingViewComponent } from './matching-view/matching-view.component';

@NgModule({
  declarations: [
    InternalusersComponent,
    ApplicantViewComponent,
    InternalSplashComponent,
    RequestViewComponent,
    RequestDetailComponent,
    ApplicantDetailComponent,
    RegisterPortalUserComponent,
    MatchingViewComponent,
  ],
  imports: [
    CommonModule,
    InternalusersRoutingModule,
    MatTableModule,
    MatListModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    ReactiveFormsModule,
  ],
})
export class InternalusersModule {}
