import {Component, Input} from '@angular/core';
import {NgChartsModule} from "ng2-charts";

@Component({
  selector: 'app-availability-chart',
  templateUrl: './availability-chart.component.html',
  styleUrl: './availability-chart.component.css'
})
export class AvailabilityChartComponent {
  @Input() datasets: any[] | undefined;
  @Input() labels: string[] | undefined;
  @Input() options: any = {
    responsive: true,
  };
  @Input() legend = true;
}
