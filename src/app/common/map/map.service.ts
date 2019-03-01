import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { CamelizePipe } from 'ngx-pipes';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private geoCoder;
  private locationCache: any = {};

  constructor(private camelizePipe: CamelizePipe) { }

  private camelize = (a: string): string => this.camelizePipe.transform(a);

  private cacheLocation(location: string, coordinates: any) {
    this.locationCache[this.camelize(location)] = coordinates;
  };

  private getLocationCached(location: string) {
    return this.locationCache[this.camelize(location)];
  };

  private geocodeLocation(location: string): Observable<any> {
    if (!this.geoCoder) {
      this.geoCoder = new (<any>window).google.maps.Geocoder()
    }

    return new Observable(observer => {
      this.geoCoder.geocode({ address: location }, (result, status) => {
        if (status == 'OK') {
          const geometry = result[0].geometry.location;
          const coordinates = { lat: geometry.lat(), lng: geometry.lng() };

          this.cacheLocation(location, coordinates);

          observer.next(coordinates);
        } else {
          observer.error("location could not be geocoded");
        }
      });
    });
  };

  public getGeoLocation(location: string): Observable<any> {
    if (this.getLocationCached(location)) {
      return of(this.getLocationCached(location));
    } else {
      return this.geocodeLocation(location);
    }
  }


}
