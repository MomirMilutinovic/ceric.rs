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

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), data: {hideNavbar: true} },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'user-list', loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule) },
  { path: 'questionnaire', component: QuestionnaireComponent },
  { path: 'results/:eventId', component: QuestionnaireResultComponent },
  { path: 'history', component: RecommendationHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
