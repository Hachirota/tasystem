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

  constructor(private http: HttpClient) {}

  getEmployers() {
    return this.http.get<any>('http://localhost:3000/client/providers');
  }

  getSkills() {
    return this.http.get<any>('http://localhost:3000/skills');
  }

  postApplicant(applicant) {
    return this.http.post<any>(
      'http://localhost:3000/applicant',
      applicant,
      this.httpOptions
    );
  }
}
