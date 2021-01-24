import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';
import { Applicant } from 'src/app/shared/models/Applicant';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css'],
})
export class ApplicantDetailComponent implements OnInit {
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
}
