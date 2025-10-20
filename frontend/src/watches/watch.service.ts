import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
    EndOfQuestionnareDto,
    RecommendationHistoryDto,
    RecommendationsDto,
    TrendingWatchesDto,
} from './model/responses';
import { Watch } from './model/watch';
import { ApiUrls } from '../app/shared/api-urls.enum';
import { Answer, Question } from './model/question';

@Injectable({
    providedIn: 'root',
})
export class WatchService {
    constructor(private http: HttpClient) {}

    getTrendingWatches(): Observable<Watch[]> {
        return this.http
            .get<TrendingWatchesDto>(ApiUrls.TrendingWatches)
            .pipe(map((dto) => dto.trendingWatches ?? []));
    }

    startQuestionaire(): Observable<Question> {
        return this.http.post<Question>(
            ApiUrls.StartQuestionnaire,
            {},
            { withCredentials: true }
        );
    }

    answer(answer: Answer): Observable<Question | EndOfQuestionnareDto> {
        return this.http.post<Question | EndOfQuestionnareDto>(
            ApiUrls.Answer,
            answer,
            { withCredentials: true }
        );
    }

    getRecommendations(
        recommendationEventId: number
    ): Observable<RecommendationsDto> {
        return this.http.get<RecommendationsDto>(
            ApiUrls.GetRecommendations + recommendationEventId,
            { withCredentials: true }
        );
    }

    getRecommendationHistory(): Observable<RecommendationHistoryDto[]> {
        return this.http
            .get<RecommendationHistoryDto[]>(ApiUrls.RecommendationHistory)
            .pipe(
                map((dtos) => {
                    dtos.forEach((dto) => {
                        dto.timestamp = new Date(dto.timestamp);
                    });
                    return dtos;
                })
            );
    }
}
