import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) {}

  getEmployers() {
    return this.http.get<any>('http://localhost:3000/client/providers');
  }

  getSkills() {
    return this.http.get<any>('http://localhost:3000/skills');
  }

  getApplicants() {
    return this.http.get<[Applicant]>('http://localhost:3000/applicant');
  }

  getApplicant(id: String) {
    id = id.trim();
    return this.http.get<Applicant>('http://localhost:3000/applicant/' + id);
  }

  getClientContact() {
    return this.http.get<ClientContact>(
      'http://localhost:3000/client/clientcontact'
    );
  }

  postRequest(request) {
    return this.http.post<Request>(
      'http://localhost:3000/client/request',
      request,
      this.httpOptions
    );
  }
}
