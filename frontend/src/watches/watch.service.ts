import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { TrendingWatchesDto } from './model/responses';
import { Watch } from './model/watch';
import { ApiUrls } from '../app/shared/api-urls.enum';

@Injectable({
  providedIn: 'root'
})
export class WatchService {


  constructor(private http: HttpClient) {}

  getTrendingWatches(): Observable<Watch[]> {
    return this.http
      .get<TrendingWatchesDto>(ApiUrls.TrendingWatches)
      .pipe(map(dto => dto.trendingWatches ?? []));
  }
}
