import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';

import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-internal-splash',
  templateUrl: './internal-splash.component.html',
  styleUrls: ['./internal-splash.component.css'],
})
export class InternalSplashComponent
  implements OnInit, AfterViewInit, AfterContentInit {
  myType = 'ColumnChart';

  applicantsByStatus: [String];
  applicantByStatusLoaded = false;
  applicantByEmployerLoaded = false;
  ApplicantsByEmployer = {};
  selectedEmployer = '';
  employers = [];

  requestsByStatus: [String];
  requestsByApplicants: [String];

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  ngAfterContentInit() {
    this.getApplicantsByStatus();
    this.applicantByStatusLoaded = true;
    this.getApplicantsByEmployer();
    this.applicantByEmployerLoaded = true;
    this.getRequestsByStatus();
    this.getRequestsByApplicants();
  }

  getRequestsByStatus() {
    this.api
      .getRequestsByStatusAdmin()
      .subscribe((data) => (this.requestsByStatus = data));
  }

  getRequestsByApplicants() {
    this.api
      .getRequestsByApplicantsAdmin()
      .subscribe((data) => (this.requestsByApplicants = data));
  }

  getApplicantsByStatus() {
    this.api
      .getApplicantsByStatusAdmin()
      .subscribe((data) => (this.applicantsByStatus = data));
  }

  getApplicantsByEmployer() {
    this.api.getApplicantsByEmployerAdmin().subscribe((data) => {
      this.ApplicantsByEmployer = data;
      this.employers = Object.keys(this.ApplicantsByEmployer);
      this.selectedEmployer = this.employers[0];
    });
  }
}
