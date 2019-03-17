import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Daterangepicker } from "ng2-daterangepicker";
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { Routes, RouterModule } from '@angular/router';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';
import { NgPipesModule } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';


const routes: Routes = [
  {
    path: 'rentals', component: RentalComponent, children: [
      { path: '', component: RentalListComponent },
      { path: ':rentalId', component: RentalDetailComponent, canActivate: [AuthGuard] }
    ]
  }
]

@NgModule({
  declarations: [
    RentalListComponent,
    RentalListItemComponent,
    RentalComponent,
    RentalDetailComponent,
    UppercasePipe,
    RentalDetailBookingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    NgPipesModule,
    MapModule,
    Daterangepicker
  ]
})
export class RentalModule { }
