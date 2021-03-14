import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css'],
})
export class RequestDetailComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ratings: MatTableDataSource<any>;
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
      this.ratings = new MatTableDataSource(ratings);
      this.ratings.paginator = this.paginator;
      this.ratings.sort = this.sort;
    });
  }
}
