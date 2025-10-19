import {AfterViewInit, Component, EventEmitter, Output} from '@angular/core';
import * as L from 'leaflet';
import { ResponsiveComponent } from '../../shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MapService } from '../service/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent extends ResponsiveComponent implements AfterViewInit{
  @Output() dataSent: EventEmitter<string> = new EventEmitter<string>();
  private map: any;
  currentMarker: any
  lat: number = 0
  lng: number = 0
  coord: any

  constructor(public res: BreakpointObserver, private mapService: MapService) {
    super(res);
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [45.2396, 19.8227],
      zoom: 13,
    });

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );
    tiles.addTo(this.map);
    this.registerOnClick()
  }

  registerOnClick(): void {
    this.map.on('click', (e: any) => {
      this.coord = e.latlng;
      this.lat = this.coord.lat;
      this.lng = this.coord.lng;
      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }
      this.mapService.reverseSearch(this.lat, this.lng).subscribe((res) => {
        console.log(res.display_name);
      });
      console.log(
        'You clicked the map at latitude: ' + this.lat + ' and longitude: ' + this.lng
      );
      this.currentMarker = new L.Marker([this.lat, this.lng]).addTo(this.map);
      this.dataSent.emit(this.coord);
    });
  }

  ngAfterViewInit(): void {
    L.Marker.prototype.options.icon = L.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png',
    });
    this.initMap();
  }
}