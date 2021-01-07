import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExternalusersComponent } from './externalusers.component';
import { RequestFormComponent } from './request-form/request-form.component';
import { ExternalusersRoutingModule } from './externalusers-routing.module';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
import { RequestViewComponent } from './request-view/request-view.component';

@NgModule({
  declarations: [ExternalusersComponent, RequestFormComponent, RequestViewComponent],
  imports: [
    CommonModule,
    ExternalusersRoutingModule,
    MatListModule,
    ReactiveFormsModule,
  ],
})
export class ExternalusersModule {}
