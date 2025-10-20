import { Component, OnInit } from '@angular/core';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WatchService } from '../watch.service';
import { RecommendationHistoryDto } from '../model/responses';

@Component({
  selector: 'app-recommendation-history',
  templateUrl: './recommendation-history.component.html',
  styleUrl: './recommendation-history.component.css'
})
export class RecommendationHistoryComponent extends ResponsiveComponent implements OnInit {

  constructor(
    private res: BreakpointObserver,
    private watchService: WatchService
  ) {
    super(res);
  }

  history: RecommendationHistoryDto[] = [];

  override ngOnInit(): void {
     this.watchService.getRecommendationHistory().subscribe(
      (history) => {
        this.history = history;
      }
     )
  }
}
