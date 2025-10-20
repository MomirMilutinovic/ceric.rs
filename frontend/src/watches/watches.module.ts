import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchCardComponent } from './watch-card/watch-card.component';
import { MaterialModule } from '../app/infrastructure/material/material.module';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireResultComponent } from './questionnaire-result/questionnaire-result.component';
import { RecommendationHistoryComponent } from './recommendation-history/recommendation-history.component';
import { RouterModule } from '@angular/router';
import { IconicWatchQuestionsComponent } from './iconic-watch-questions/iconic-watch-questions.component';
import { CustomQuestionsComponent } from './custom-questions/custom-questions.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddIconicWatchQuestionComponent } from './add-iconic-watch-question/add-iconic-watch-question.component';



@NgModule({
  declarations: [
    WatchCardComponent,
    QuestionnaireComponent,
    QuestionnaireResultComponent,
    RecommendationHistoryComponent,
    IconicWatchQuestionsComponent,
    CustomQuestionsComponent,
    AddQuestionComponent,
    AddIconicWatchQuestionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
],
  exports: [
    WatchCardComponent,
    QuestionnaireComponent,
    QuestionnaireResultComponent,
    RecommendationHistoryComponent,
    IconicWatchQuestionsComponent,
    CustomQuestionsComponent,
    AddQuestionComponent,
    AddIconicWatchQuestionComponent,
  ]
})
export class WatchesModule { }
