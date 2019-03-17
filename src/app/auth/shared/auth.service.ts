import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { params } from '../../params/params'
import 'rxjs/Rx';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';

const jwt = new JwtHelperService();
const authResourseUri: string = params.SERVER_API + "/users";

class DecodedToken {
  exp: number = 0;
  username: string = '';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private decodedToken: DecodedToken;

  constructor(private httpClient: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);

    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));

    return token;
  }

  private getExpirationTime() {
    return moment.unix(this.decodedToken.exp);
  }

  // public getRentalById(user: string): Observable<Rental> {
  //   return <Observable<Rental>> this.httpClient.get(params.SERVER_API + '/' + rentalId);
  // }

  // public getRentals(): Observable<Rental[]> {
  //   return <Observable<Rental[]>> this.httpClient.get(rentalResourseUri);
  // }

  public register(userData: any): Observable<any> {
    return this.httpClient.post(authResourseUri + "/register", userData);
  }

  public login(userData: any): Observable<any> {
    return this.httpClient.post(authResourseUri + "/auth", userData).map(
      (token: string) => this.saveToken(token)
    );
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpirationTime());
  }

  public logout() {
    localStorage.removeItem('bwm_auth');
    localStorage.removeItem('bwm_meta');

    this.decodedToken = new DecodedToken();
  }

  public getUserName(): string {
    return this.decodedToken.username;
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }
}
