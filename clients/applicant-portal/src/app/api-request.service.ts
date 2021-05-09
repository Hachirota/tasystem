import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  httpOptions = {
    headers: new HttpHeaders({
      responseType: 'json',
    }),
  };

  URI: String = 'http://localhost:3000';

  constructor(private http: HttpClient) {}
  // Get all employers who are providing applicants to the scheme,
  // used in dropdown list in app form
  getEmployers() {
    return this.http.get<any>(this.URI + '/client/providers');
  }

  // Get all skills applicant is able to select
  getSkills() {
    return this.http.get<any>(this.URI + '/skills');
  }

  // Post submitted application to server
  postApplicant(applicant) {
    return this.http.post<any>(
      this.URI + '/applicant',
      applicant,
      this.httpOptions
    );
  }
}
