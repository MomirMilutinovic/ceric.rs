import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchCardComponent } from './watch-card/watch-card.component';
import { MaterialModule } from '../app/infrastructure/material/material.module';



@NgModule({
  declarations: [
    WatchCardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    WatchCardComponent
  ]
})
export class WatchesModule { }
