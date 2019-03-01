import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';

import { MapComponent } from './map.component';

import { CamelizePipe } from 'ngx-pipes';

import { params } from '../../params/params'

@NgModule({
  declarations: [
    MapComponent
  ],
  exports: [
    MapComponent
  ],
  imports: [
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: params.GAPI_KEY
    })
  ],
  providers: [
    CamelizePipe
  ]
})
export class MapModule { }
