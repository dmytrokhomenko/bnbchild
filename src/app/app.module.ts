import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RentalModule } from './rental/rental.module';
import { NgPipesModule } from 'ngx-pipes';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AuthModule } from './auth/auth.module';



const routes: Routes = [
  {path: '', redirectTo: '/rentals', pathMatch: 'full' }//pathMatch 'full' will copy full url
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    RentalModule,
    AuthModule,
    NgPipesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
