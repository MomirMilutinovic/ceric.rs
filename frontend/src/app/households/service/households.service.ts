import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {AvailabilityStatus} from "../model/availability-model";
import {Observable} from "rxjs";
import { ApiUrls } from '../../shared/api-urls.enum';
import {Household} from "../model/hosehold-model";
import {User} from "../../real-estate/model/real-estate.model";

@Injectable({
  providedIn: 'root'
})
export class HouseholdsService {

  constructor(private http: HttpClient) {}

  getHouseholdAvailabilityData(householdId: string, startDate: string, endDate: string): Observable<AvailabilityStatus[]> {
    const params = new HttpParams()
      .set('householdId', householdId)
      .set('startDate', startDate)
      .set('endDate', endDate);

    return this.http.get<AvailabilityStatus[]>(ApiUrls.HouseholdAvailability, { params });
  }

  getHousehold(id: string | null): Observable<Household> {
    return this.http.get<Household>(ApiUrls.Household+"/"+id);
  }

  getAllHouseholds(floorNumber: number | null, squareFootage: number | null, isActive: boolean | null, hasOwner: boolean | null): Observable<Household[]> {
    let params = new HttpParams();

    if (floorNumber !== null) {
      params = params.set('floorNumber', floorNumber.toString());
    }

    if (squareFootage !== null) {
      params = params.set('squareFootage', squareFootage.toString());
    }

    if (isActive !== null) {
      params = params.set('isActive', isActive.toString());
    }

    if (hasOwner !== null) {
      params = params.set('hasOwner', hasOwner);
    }
    return this.http.get<Household[]>(ApiUrls.Household, {params});
  }
}
