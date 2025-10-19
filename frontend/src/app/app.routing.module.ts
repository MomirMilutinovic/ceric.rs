import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './auth/login/login.component';
import { RequestsOverviewComponent } from './real-estate/requests-overview/requests-overview.component';
import {HouseholdDetailsComponent} from "./households/household-details/household-details.component";
import {HouseholdsOverviewComponent} from "./households/households-overview/households-overview.component";
import { CreateRealEstateComponent } from './real-estate/create-real-estate/create-real-estate.component';
import { CreateHouseholdComponent } from './real-estate/create-household/create-household.component';
import { KeysOverviewComponent } from './crypto/keys-overview/keys-overview.component';
import { EncryptComponent } from './crypto/encrypt/encrypt.component';
import { DecryptComponent } from './crypto/decrypt/decrypt.component';
import { SignComponent } from './crypto/sign/sign.component';
import { VerifyComponent } from './crypto/verify/verify.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), data: {hideNavbar: true} },
  {component: RequestsOverviewComponent, path:"requests-overview"},
  {path:'household/:id', component:HouseholdDetailsComponent},
  {path:'household', component:HouseholdsOverviewComponent},
  { path:"requests-overview", component: RequestsOverviewComponent },
  { path:"create-real-estate", component: CreateRealEstateComponent },
  { path:"create-household", component: CreateHouseholdComponent },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'user-list', loadChildren: () => import('./user-list/user-list.module').then(m => m.UserListModule) },
  { path: 'keys-overview', component: KeysOverviewComponent},
  { path: 'encrypt', component: EncryptComponent},
  { path: 'decrypt', component: DecryptComponent},
  { path: 'sign', component: SignComponent},
  { path: 'verify', component: VerifyComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
