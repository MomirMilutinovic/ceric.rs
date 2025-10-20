import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchCardComponent } from './watch-card/watch-card.component';
import { MaterialModule } from '../app/infrastructure/material/material.module';
import { QuestionnaireComponent } from './questionnaire/questionnaire.component';
import { QuestionnaireResultComponent } from './questionnaire-result/questionnaire-result.component';



@NgModule({
  declarations: [
    WatchCardComponent,
    QuestionnaireComponent,
    QuestionnaireResultComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    WatchCardComponent,
    QuestionnaireComponent,
    QuestionnaireResultComponent
  ]
})
export class WatchesModule { }
