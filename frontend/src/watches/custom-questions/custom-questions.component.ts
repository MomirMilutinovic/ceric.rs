import { Component, OnInit } from '@angular/core';
import { Question } from '../model/question';
import { ResponsiveComponent } from '../../app/shared/responsive-component.component';
import { BreakpointObserver } from '@angular/cdk/layout';
import { WatchService } from '../watch.service';

@Component({
  selector: 'app-custom-questions',
  templateUrl: './custom-questions.component.html',
  styleUrl: './custom-questions.component.css'
})
export class CustomQuestionsComponent extends ResponsiveComponent implements OnInit {
  questions: Question[] = [];

  displayedColumns: string[] = ['id', 'question', 'answerType', 'allowedAnswers'];

  constructor(private res: BreakpointObserver, private watchService: WatchService) {
    super(res);
  }

  override ngOnInit(): void {
      this.watchService.getCustomQuestions().subscribe(
        (questions) => {this.questions = questions}
      )
  }

}
