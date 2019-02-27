import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'bnb-rental-detail',
  templateUrl: './rental-detail.component.html',
  styleUrls: ['./rental-detail.component.scss']
})
export class RentalDetailComponent implements OnInit {

  rentalId: any;
  currentRental: Rental;

  constructor(private route: ActivatedRoute, private rentalService: RentalService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.rentalId = params.rentalId;

      this.getRental(this.rentalId);
    })
  }

  getRental(rentalId: string) {
    const rentalObservable: Observable<Rental> = this.rentalService.getRentalById(rentalId);

    rentalObservable.subscribe(
      (findedRental: Rental) => {
        this.currentRental = findedRental;
      }
    )
  }

}
