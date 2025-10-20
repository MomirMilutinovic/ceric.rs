import { Component, OnInit } from '@angular/core';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { ActivatedRoute } from '@angular/router';
import { WatchService } from '../watch.service';
import { Watch } from '../model/watch';

@Component({
  selector: 'app-questionnaire-result',
  templateUrl: './questionnaire-result.component.html',
  styleUrl: './questionnaire-result.component.css'
})
export class QuestionnaireResultComponent extends ResponsiveComponent implements OnInit {
  eventId: number | undefined;
  recommendations: Watch[] = [];

  constructor(private res: BreakpointObserver, private route: ActivatedRoute, private watchService: WatchService) {
    super(res);
  }

  loading = true;
  date: Date | undefined;

  override ngOnInit(): void {
    this.eventId = Number.parseInt(this.route.snapshot.paramMap.get("eventId") || "0");
    this.watchService.getRecommendations(this.eventId).subscribe(
      (recommendations) => { 
        this.date = new Date(recommendations.timestamp); 
        this.recommendations = recommendations.recommendations.map(r => r.watch); 
        this.loading = false;
      }
    );
  }
}
