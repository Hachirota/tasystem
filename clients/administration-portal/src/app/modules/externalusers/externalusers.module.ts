import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalusersComponent } from './externalusers.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { MatTableModule } from '@angular/material/table';
import { ExternalusersRoutingModule } from './externalusers-routing.module';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestViewComponent } from './request-view/request-view.component';
import { StaffViewComponent } from './staff-view/staff-view.component';
import { StaffDetailComponent } from './staff-view/staff-detail/staff-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { RequestDetailComponent } from './request-view/request-detail/request-detail.component';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  declarations: [
    ExternalusersComponent,
    RequestFormComponent,
    RequestViewComponent,
    StaffViewComponent,
    StaffDetailComponent,
    RequestDetailComponent,
  ],
  imports: [
    CommonModule,
    ExternalusersRoutingModule,
    MatListModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule,
    MatTabsModule,
    MatExpansionModule,
  ],
})
export class ExternalusersModule {}
