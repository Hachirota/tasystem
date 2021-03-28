import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';
import { Applicant } from 'src/app/shared/models/Applicant';

@Component({
  selector: 'app-applicant-detail',
  templateUrl: './applicant-detail.component.html',
  styleUrls: ['./applicant-detail.component.css'],
})
export class ApplicantDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'requestid',
    'firstname',
    'surname',
    'client',
    'distance',
    'skillfit',
    'viewdetail',
  ];
  ratings: MatTableDataSource<any>;
  id: String;
  applicant: Applicant;

  constructor(
    private apiService: ApiRequestService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getApplicantInfo();
  }

  getApplicantInfo() {
    this.route.params.subscribe((params) => {
      this.id = params.id;
    });
    this.apiService.getApplicant(this.id).subscribe((applicant) => {
      this.applicant = applicant;
    });
    this.apiService.getApplicantRatings(this.id).subscribe((ratings) => {
      this.ratings = new MatTableDataSource(ratings);
      this.ratings.paginator = this.paginator;
      this.ratings.sort = this.sort;
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
