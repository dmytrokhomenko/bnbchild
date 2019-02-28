import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';
import { HttpClient } from '@angular/common/http';
import { params } from '../../params/params'

const rentalResourseUri: string = params.SERVER_API + 'rentals';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  constructor(private httpClient: HttpClient) { }

  public getRentalById(rentalId: string): Observable<Rental> {
    return <Observable<Rental>> this.httpClient.get(rentalResourseUri + '/' + rentalId);
  }

  public getRentals(): Observable<Rental[]> {
    return <Observable<Rental[]>> this.httpClient.get(rentalResourseUri);
  }

}
