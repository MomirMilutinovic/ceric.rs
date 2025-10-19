import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgChartsModule} from "ng2-charts";
import {HouseholdDetailsComponent} from "./household-details/household-details.component";
import {AvailabilityChartComponent} from "./availability-chart/availability-chart.component";
import {HouseholdsOverviewComponent} from "./households-overview/households-overview.component";
import {MaterialModule} from "../infrastructure/material/material.module";

@NgModule({
  declarations: [HouseholdDetailsComponent, AvailabilityChartComponent, HouseholdsOverviewComponent],
  imports: [
    CommonModule,NgChartsModule, MaterialModule

  ],
  exports: [
    HouseholdDetailsComponent,
    AvailabilityChartComponent,
    HouseholdsOverviewComponent
  ],
})
export class HouseholdsModule { }

