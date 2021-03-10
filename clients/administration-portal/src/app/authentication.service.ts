import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();

class DecodedToken {
  exp: number;
  firstname: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  httpOptions = {
    headers: new HttpHeaders({
      responseType: 'json',
    }),
  };
  private decodedtoken;

  host = 'http://localhost:3000';

  constructor(private http: HttpClient) {
    this.decodedtoken =
      JSON.parse(localStorage.getItem('auth_meta')) || new DecodedToken();
  }

  registerPortalUser(user): Observable<any> {
    let URI = this.host + '/user';
    return this.http.post(URI, user, this.httpOptions);
  }

  login(userData: any): Observable<any> {
    let URI = this.host + '/user/login';
    return this.http.post(URI, userData).pipe(
      shareReplay(),
      map((token) => {
        return this.saveToken(token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_tkn');
    localStorage.removeItem('auth_meta');
    this.decodedtoken = new DecodedToken();
  }

  isAuthenticated(): boolean {
    return moment().isBefore(moment.unix(this.decodedtoken.exp));
  }

  private saveToken(token: any): any {
    this.decodedtoken = jwt.decodeToken(token);
    localStorage.setItem('auth_tkn', token);
    localStorage.setItem('auth_meta', JSON.stringify(this.decodedtoken));
    return token;
  }

  getEmployer(): string {
    return this.decodedtoken.clientID;
  }

  getName(): string {
    return this.decodedtoken.firstname;
  }
}
