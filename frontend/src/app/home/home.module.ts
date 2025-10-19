import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { LoginActivate, anyRole } from '../auth/guard/login-activate';
import { MaterialModule } from '../infrastructure/material/material.module';
import { WatchesModule } from '../../watches/watches.module';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoginActivate], data: {'role': anyRole } }
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    WatchesModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
