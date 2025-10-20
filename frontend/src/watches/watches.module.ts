import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchCardComponent } from './watch-card/watch-card.component';
import { MaterialModule } from '../app/infrastructure/material/material.module';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireResultComponent } from './questionnaire-result/questionnaire-result.component';
import { RecommendationHistoryComponent } from './recommendation-history/recommendation-history.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    WatchCardComponent,
    QuestionnaireComponent,
    QuestionnaireResultComponent,
    RecommendationHistoryComponent
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
    RecommendationHistoryComponent
  ]
})
export class WatchesModule { }
