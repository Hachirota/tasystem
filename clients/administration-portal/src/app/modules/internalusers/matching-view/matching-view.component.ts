import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-matching-view',
  templateUrl: './matching-view.component.html',
  styleUrls: ['./matching-view.component.css'],
})
export class MatchingViewComponent implements OnInit {
  requests;
  openRequests: MatTableDataSource<any>;
  matchingResult: MatTableDataSource<any>;
  errors: any = [];

  openRequestsDisplayedColumns: string[] = [
    'requestid',
    'client',
    'requesterfirstname',
    'requstersurname',
    'status',
    'grade',
    'numberrequired',
    'numberassigned',
    'viewdetail',
  ];

  matchingResultsDisplayedColumns: string[] = [
    'requestid',
    'numberrequired',
    'numbermatched',
    'viewdetail',
  ];

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.api.getRequests().subscribe((requests) => {
      this.requests = requests;
      this.openRequests = this.requests.filter((request) => {
        return request.status == 'Open';
      });
    });
  }

  match() {
    this.api.getMatching().subscribe(
      (result) => {
        this.matchingResult = result;
        console.log(this.matchingResult);
      },
      (errorResponse) => {
        this.errors.push(errorResponse.error.error);
      }
    );
    this.getRequests();
  }
}
