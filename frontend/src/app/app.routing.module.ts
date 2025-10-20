import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RequestsOverviewComponent } from './real-estate/requests-overview/requests-overview.component';
import {HouseholdDetailsComponent} from "./households/household-details/household-details.component";
import {HouseholdsOverviewComponent} from "./households/households-overview/households-overview.component";
import { CreateRealEstateComponent } from './real-estate/create-real-estate/create-real-estate.component';
import { CreateHouseholdComponent } from './real-estate/create-household/create-household.component';
import { QuestionnaireComponent } from '../watches/questionnaire/questionnaire.component';
import { QuestionnaireResultComponent } from '../watches/questionnaire-result/questionnaire-result.component';
import { RecommendationHistoryComponent } from '../watches/recommendation-history/recommendation-history.component';
import { CustomQuestionsComponent } from '../watches/custom-questions/custom-questions.component';
import { AddQuestionComponent } from '../watches/add-question/add-question.component';
import { IconicWatchQuestionsComponent } from '../watches/iconic-watch-questions/iconic-watch-questions.component';
import { AddIconicWatchQuestionComponent } from '../watches/add-iconic-watch-question/add-iconic-watch-question.component';
import { AllWatchesComponent } from '../watches/all-watches/all-watches.component';
import { AddWatchComponent } from '../watches/add-watch/add-watch.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), data: {hideNavbar: true} },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'user-list', loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule) },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'results/:eventId', component: QuestionnaireResultComponent },
  { path: 'history', component: RecommendationHistoryComponent },
  { path: 'custom-questions', component: CustomQuestionsComponent },
  { path: 'add-custom-question', component: AddQuestionComponent },
  { path: 'iconic-watch-questions', component: IconicWatchQuestionsComponent },
  { path: 'add-iconic-watch-question', component: AddIconicWatchQuestionComponent },
  { path: 'watches', component: AllWatchesComponent },
  { path: 'add-watch', component: AddWatchComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
