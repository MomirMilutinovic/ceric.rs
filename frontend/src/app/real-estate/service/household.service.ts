import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../../shared/api-urls.enum';
import { Household } from '../model/household.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HouseholdService {

  constructor(
    private http: HttpClient
  ) {}

  create(household: Household) : Observable<Household>{
    return this.http.post<Household>(ApiUrls.CreateHousehold, household)
  }
}
