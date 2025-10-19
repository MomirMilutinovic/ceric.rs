import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrls } from '../../shared/api-urls.enum';
import { RealEstate, Request } from '../model/real-estate.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RealEstateService {

  constructor(
    private http: HttpClient
  ) {}

  getPendingRequests() : Observable<Request[]>{
    return this.http.get<Request[]>(ApiUrls.ViewPendingRequests)
  }

  getUserRequests(loggedUserId: number, admin?:string, status?: string, submissionStart?: string, 
    submissionEnd?: string, approvalStart?: string, approvalEnd?: string, sortOption?: string
  ): Observable<Request[]> {
    
    let params = new HttpParams();

    if (admin) {
      params = params.set('adminUsername', admin);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (submissionStart) {
      params = params.set('submissionDateStart', submissionStart);
    }
    if (submissionEnd) {
      params = params.set('submissionDateEnd', submissionEnd);
    }
    if (approvalStart) {
      params = params.set('approvalDateStart', approvalStart);
    }
    if (approvalEnd) {
      params = params.set('approvalDateEnd', approvalEnd);
    }
    if (sortOption) {
      params = params.set('sortOption', sortOption);
    }

    return this.http.get<Request[]>(ApiUrls.ViewUserRequests + "/" + loggedUserId, {params})
  }

  create(realEstate: any) : Observable<RealEstate>{
    return this.http.post<RealEstate>(ApiUrls.CreateRealEstate, realEstate)
  }

  accept(request: any) : Observable<Request>{
    return this.http.put<Request>(ApiUrls.AcceptRequest, request)
  }
  
  decline(request: Request) : Observable<Request>{
    return this.http.put<Request>(ApiUrls.DeclineRequest, request)
  }
}
