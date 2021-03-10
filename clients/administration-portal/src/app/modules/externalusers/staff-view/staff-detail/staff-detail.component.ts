import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';
import { Applicant } from 'src/app/shared/models/Applicant';

@Component({
  selector: 'app-staff-detail',
  templateUrl: './staff-detail.component.html',
  styleUrls: ['./staff-detail.component.css'],
})
export class StaffDetailComponent implements OnInit {
  id: String;
  applicant: Applicant;
  constructor(
    private apiService: ApiRequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.apiService.getApplicant(this.id).subscribe((applicant) => {
      this.applicant = applicant;
    });
  }

  validate() {
    this.apiService
      .updateApplicant(this.id, { status: 'Validated' })
      .subscribe((applicant) => {
        this.applicant = applicant;
      });
  }
}
