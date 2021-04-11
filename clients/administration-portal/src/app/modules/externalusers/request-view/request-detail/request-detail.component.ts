import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
})
export class RequestDetailComponent implements OnInit {
  requestId: String;
  request: any;

  displayedColumns: string[] = [
    'ppsnumber',
    'firstname',
    'surname',
    'distance',
    'skillfit',
    'viewdetail',
  ];

  constructor(private route: ActivatedRoute, private api: ApiRequestService) {}

  ngOnInit(): void {
    this.getRequestInfo();
  }

  getRequestInfo() {
    this.route.params.subscribe((params) => {
      this.requestId = params.id;
    });

    this.api.getRequest(this.requestId).subscribe((request) => {
      this.request = request;
    });
  }

  updateApplicantStatus(id: String, accepted: Boolean) {
    let status =
      accepted == true ? 'Assignment Accepted' : 'Assignment Refused';
    this.api.updateApplicant(id, { status: status }).subscribe();
  }
}
