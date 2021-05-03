import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ApiRequestService } from 'src/app/api-request.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-external-splash',
  templateUrl: './external-splash.component.html',
  styleUrls: ['./external-splash.component.css'],
})
export class ExternalSplashComponent implements OnInit, AfterContentInit {
  myType = 'ColumnChart';

  staffByStatus: [String];
  staffByStatusTitle: String;

  requestsByStatus: [String];
  requestsByApplicants: [String];
  constructor(
    public authService: AuthenticationService,
    private api: ApiRequestService
  ) {}

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    if (this.authService.isProvider()) {
      this.staffByStatusTitle = this.authService.getClientName();
      this.getClientApplicants();
    }
    if (this.authService.isRequester()) {
      this.getRequestsByStatus();
      this.getRequestsByApplicants();
    }
  }

  getClientApplicants() {
    this.api
      .getApplicantsByStatusClient(this.authService.getEmployer())
      .subscribe((data) => (this.staffByStatus = data));
  }

  getRequestsByStatus() {
    this.api
      .getRequestsByStatusAdmin()
      .subscribe((data) => (this.requestsByStatus = data));
  }

  getRequestsByApplicants() {
    this.api
      .getRequestsByApplicantsAdmin()
      .subscribe((data) => (this.requestsByApplicants = data));
  }
}
