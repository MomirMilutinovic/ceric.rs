import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../../shared/api-urls.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(
    private http: HttpClient
  ) {}

  getAll() : Observable<any[]>{
    return this.http.get<any[]>(ApiUrls.Cities)
  }
}
