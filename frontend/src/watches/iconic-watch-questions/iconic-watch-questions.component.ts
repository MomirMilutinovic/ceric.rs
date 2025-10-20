import { Component, OnInit } from '@angular/core';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { IconicWatchQuestion } from '../model/question';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-iconic-watch-questions',
  templateUrl: './iconic-watch-questions.component.html',
  styleUrl: './iconic-watch-questions.component.css'
})
export class IconicWatchQuestionsComponent extends ResponsiveComponent implements OnInit {
  displayedColumns = ['id', 'question', 'positiveAnswer', 'pointBoost', 'watches'];
  iconicWatchQuestions: IconicWatchQuestion[] = [];

  constructor (
    private res: BreakpointObserver,
    private watchService: WatchService 
  ) {
    super(res);
  }

  override ngOnInit(): void {
      this.watchService.getIconicWatchQuestions().subscribe(
        (iconicWatchQuestions) => {
          this.iconicWatchQuestions = iconicWatchQuestions;
        }
      )
  }
}
