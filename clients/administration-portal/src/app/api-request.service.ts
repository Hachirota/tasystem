import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Applicant } from './shared/models/Applicant';
import { ClientContact } from './shared/models/ClientContact';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  httpOptions = {
    headers: new HttpHeaders({
      responseType: 'json',
    }),
  };

  URI = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getEmployers() {
    return this.http.get<any>(this.URI + '/client/providers');
  }

  getClients() {
    return this.http.get<any>(this.URI + '/client/');
  }

  getSkills() {
    return this.http.get<any>(this.URI + '/skills');
  }

  getRequests() {
    return this.http.get<any>(this.URI + '/client/request');
  }

  getRequest(id: String) {
    id = id.trim();
    return this.http.get<any>(this.URI + '/client/request/' + id);
  }

  getApplicants() {
    return this.http.get<[Applicant]>(this.URI + '/applicant');
  }

  getApplicant(id: String) {
    id = id.trim();
    return this.http.get<Applicant>(this.URI + '/applicant/' + id);
  }

  getRequestRatings(id: String) {
    let trimmedId = id.trim();
    return this.http.get<[any]>(this.URI + '/rating/request/' + trimmedId);
  }

  getApplicantRatings(id: String) {
    let trimmedId = id.trim();
    return this.http.get<[any]>(this.URI + '/rating/applicant/' + trimmedId);
  }

  getStaff(employer: String) {
    employer = employer.trim();
    return this.http.get<[Applicant]>(this.URI + '/staff/' + employer);
  }

  updateApplicant(id: String, body) {
    id = id.trim();
    return this.http.put<Applicant>(this.URI + '/applicant/' + id, body);
  }

  getClientContact() {
    return this.http.get<ClientContact>(this.URI + '/client/clientcontact');
  }

  postRequest(request) {
    return this.http.post<Request>(
      this.URI + '/client/request',
      request,
      this.httpOptions
    );
  }
}
