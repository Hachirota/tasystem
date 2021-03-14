import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/api-request.service';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css'],
})
export class RequestViewComponent implements OnInit {
  displayedColumns: string[] = [
    'client',
    'requesterfirstname',
    'requstersurname',
    'status',
    'grade',
    'numberrequired',
    'numberassigned',
    'viewdetail',
  ];
  requests: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiRequestService) {}

  ngOnInit(): void {
    this.getRequests();
  }

  getRequests() {
    this.api.getRequests().subscribe((requests) => {
      console.log(requests);
      this.requests = new MatTableDataSource(requests);
      this.requests.paginator = this.paginator;
      this.requests.sort = this.sort;
      // Override filter predicate to allow nested object filtering
      this.requests.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.requests.filter = filterValue.trim().toLowerCase();

    if (this.requests.paginator) {
      this.requests.paginator.firstPage();
    }
  }
}
