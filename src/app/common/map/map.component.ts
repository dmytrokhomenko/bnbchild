import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';

@Component({
  selector: 'bnb-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  @Input() location: string;

  isPositionError: boolean = false;
  isReady: boolean= false;

  lat: number = 0;
  lng: number = 0;

  constructor(private mapService: MapService, private ref: ChangeDetectorRef) {}

  mapReadyHandler() {   
    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates: any) => {
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;

        this.ref.detectChanges();
      },
      (err) =>{
  
        this.isPositionError = true;
      }
    )
  };
}
