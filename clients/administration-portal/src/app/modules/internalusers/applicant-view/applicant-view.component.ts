import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiRequestService } from 'src/app/api-request.service';
import { Applicant } from 'src/app/shared/models/Applicant';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-applicant-view',
  templateUrl: './applicant-view.component.html',
  styleUrls: ['./applicant-view.component.css'],
})
export class ApplicantViewComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = [
    'ppsnumber',
    'firstname',
    'surname',
    'status',
    'employer',
    'grade',
    'viewdetail',
  ];
  dataSource: MatTableDataSource<any>;
  applicantArray = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiRequestService) {}

  ngOnInit() {
    this.getApplicants();
  }

  btnclick(id) {
    console.log(id);
  }

  getApplicants() {
    this.api.getApplicants().subscribe((applicants) => {
      this.dataSource = new MatTableDataSource(applicants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applicantArray.push(applicants);
      // Override filter predicate to allow nested object filtering
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) != -1;
      };
    });
  }

  ngAfterViewInit() {
    console.log(this.applicantArray);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;

    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
