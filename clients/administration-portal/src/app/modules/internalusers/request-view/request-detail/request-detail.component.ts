import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
})
export class RequestDetailComponent implements OnInit {
  @ViewChild('validatedPaginator', { static: true })
  validatedPaginator: MatPaginator;
  @ViewChild('unvalidatedPaginator', { static: true })
  unvalidatedPaginator: MatPaginator;

  validatedRatings: MatTableDataSource<any>;
  unvalidatedRatings: MatTableDataSource<any>;
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

    this.api.getRequestRatings(this.requestId).subscribe((ratings) => {
      this.validatedRatings = new MatTableDataSource(
        ratings.validatedApplicants
      );
      this.validatedRatings.paginator = this.validatedPaginator;

      this.unvalidatedRatings = new MatTableDataSource(
        ratings.unvalidatedApplicants
      );
      this.unvalidatedRatings.paginator = this.unvalidatedPaginator;
    });
  }

  updateApplicantStatus(id: String, accepted: Boolean) {
    let status =
      accepted == true ? 'Assignment Accepted' : 'Assignment Refused';
    this.api.updateApplicant(id, { status: status }).subscribe();
    this.api.getRequest(this.requestId).subscribe((request) => {
      this.request = request;
    });
  }
}
