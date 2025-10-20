import { Watch } from './watch';

export interface TrendingWatchesDto {
  trendingWatches: Watch[];
}

export interface EndOfQuestionnareDto {
    recommendations: Recommendation[],
    eventId: number
}

export interface RecommendationsDto {
    recommendations: Recommendation[],
    eventId: number,
    timestamp: Date
}

export interface Recommendation {
    watch: Watch,
    score: number
}

export interface RecommendationHistoryDto {
    eventId: number,
    timestamp: Date,
}