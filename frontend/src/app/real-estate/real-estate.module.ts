import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestsOverviewComponent } from './requests-overview/requests-overview.component';
import { MaterialModule } from '../infrastructure/material/material.module';
import { RequestDeclineDialogComponent } from './request-decline-dialog/request-decline-dialog.component';
import { CreateRealEstateComponent } from './create-real-estate/create-real-estate.component';
import { CreateHouseholdComponent } from './create-household/create-household.component';
import { MapComponent } from './map/map.component';


@NgModule({
  declarations: [RequestsOverviewComponent, RequestDeclineDialogComponent, CreateRealEstateComponent, CreateHouseholdComponent, MapComponent],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [RequestsOverviewComponent, RequestDeclineDialogComponent, CreateRealEstateComponent, CreateHouseholdComponent, MapComponent]
})
export class RealEstateModule { }
