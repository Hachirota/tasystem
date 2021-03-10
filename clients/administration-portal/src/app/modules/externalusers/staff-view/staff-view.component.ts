import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/api-request.service';
import { AuthenticationService } from 'src/app/authentication.service';
import { Applicant } from 'src/app/shared/models/Applicant';

@Component({
  selector: 'app-staff-view',
  templateUrl: './staff-view.component.html',
  styleUrls: ['./staff-view.component.css'],
})
export class StaffViewComponent implements OnInit {
  displayedColumns: String[] = [
    'ppsnumber',
    'firstname',
    'surname',
    'status',
    'employer',
    'grade',
    'viewdetail',
  ];
  employer: String;
  dataSource: MatTableDataSource<any>;
  staffArray: [Applicant];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private api: ApiRequestService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.employer = this.auth.getEmployer();
    this.getStaff();
  }

  getStaff() {
    this.api.getStaff(this.employer).subscribe((staff) => {
      this.dataSource = new MatTableDataSource(staff);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.staffArray = staff;
      // Override filter predicate to allow nested object filtering
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
