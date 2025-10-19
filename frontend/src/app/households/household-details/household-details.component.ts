import { Component, Input, OnInit } from '@angular/core';
import { ResponsiveComponent } from "../../shared/responsive-component.component";
import { HouseholdsService } from "../service/households.service";
import { BreakpointObserver } from "@angular/cdk/layout";
import { AvailabilityStatus } from "../model/availability-model";
import * as SockJS from 'sockjs';
import { Client } from '@stomp/stompjs';
import {ActivatedRoute} from "@angular/router";
import {Household} from "../model/hosehold-model";
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';



@Component({
    selector: 'app-availability',
    templateUrl: './household-details.component.html',
    styleUrls: ['./household-details.component.css'],
    providers: [DatePipe]
})
export class HouseholdDetailsComponent extends ResponsiveComponent implements OnInit {

  household: Household  | undefined;
  private availabilityData: AvailabilityStatus[] | undefined;
  startDate: Date | null = null;
  endDate: Date | null = null;

  availabilityChart: {
        data: any[],
        labels: string[],
        options: any
    } = { data: [], labels: [], options: {} };

    private stompClient: Client | undefined;

    constructor(public res: BreakpointObserver, private householdService: HouseholdsService, private route: ActivatedRoute,
                private datePipe: DatePipe) {
        super(res);
      // const token = localStorage.getItem("jwt");
      // if(token){
      //   const decodedToken = jwtDecode(token);
      //   this.user = decodedToken.sub;
      // }
      // console.log(this.user)
    }

    override ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      this.householdService.getHousehold(id).subscribe((data: Household) => {
        this.household = data;
        this.InitSockets();

      });

    }

  InitSockets(): void {
    // Initialize the STOMP client here
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8081/socket',
      connectHeaders: {},
      debug: (str) => {
        console.log(str);
      },
      onConnect: (frame) => {
        console.log('Connected: ' + frame);

        if (this.household && this.household.id) {
          // @ts-ignore
          this.stompClient.subscribe(`/socket-publisher/availability/${"simulator" + this.household.id.toString()}`, (message) => {
            console.log('Received message: ' + message.body);
            const data = JSON.parse(message.body);
            console.log(data);
            this.availabilityData = data;
            this.processData();
          });
        }
      },
      onStompError: (frame) => {
        console.error('STOMP error: ' + frame);
      }
    });

    this.stompClient.activate();
  }

    private processData(): void {
        if (this.availabilityData) {
            this.availabilityData.forEach((status) => {
                if (isNaN(status.offlinePercentage)) {
                    status.offlinePercentage = 100;
                }
                if (isNaN(status.onlinePercentage)) {
                    status.onlinePercentage = 0;
                }
                if (isNaN(status.offlineHours)) {
                    status.offlineHours = 24;
                }
                if (isNaN(status.onlineHours)) {
                    status.onlineHours = 0;
                }
            });

            const labels = this.availabilityData.map(data => data.timePeriod);
            const onlinePercentages = this.availabilityData.map(data => data.onlinePercentage);
            const offlinePercentages = this.availabilityData.map(data => data.offlinePercentage);

            this.availabilityChart = {
                labels: labels,
                data: [
                    {
                        label: 'Online Percentage',
                        data: onlinePercentages,
                        backgroundColor: 'rgba(126,167,245,0.6)',
                    },
                    {
                        label: 'Offline Percentage',
                        data: offlinePercentages,
                        backgroundColor: 'rgb(54,52,52)',
                    },
                ],
                options: {
                    responsive: true,
                    scales: {
                        x: {
                            stacked: true,
                        },
                        y: {
                            beginAtZero: true,
                            max: 100,
                        }
                    }
                }
            };
        }
    }

  onPresetSelection(value: string) {
    switch (value) {
      case '3h':
        this.startDate = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);
        break;
      case '6h':
        this.startDate = new Date(new Date().getTime() - 6 * 60 * 60 * 1000);
        break;
      case '12h':
        this.startDate = new Date(new Date().getTime() - 12 * 60 * 60 * 1000);
        break;
      case '24h':
        this.startDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
        break;
      case '7d':
        this.startDate = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '1m':
        this.startDate = new Date(new Date(new Date()).setMonth(new Date().getMonth() - 1));
        break;
      case '3m':
        this.startDate = new Date(new Date().setMonth(new Date().getMonth() - 3));
        break;
      case '1y':
        this.startDate = new Date(new Date(new Date()).setFullYear(new Date().getFullYear() - 1));
        break;
    }
    this.endDate = new Date();
  }

  onSearch() {
    if (this.startDate && this.endDate) {
      const diff = Math.abs(this.endDate.getTime() - this.startDate.getTime());
      const oneYearInMs = 366 * 24 * 60 * 60 * 1000;
      if (diff > oneYearInMs) {
        alert('Date range cannot exceed one year.');
        this.endDate = null;
      } else {
        console.log('Searching availability within:', this.startDate, this.endDate);
        const formattedStartDate = this.formatDate(this.startDate);
        const formattedEndDate = this.formatDate(this.endDate);
        this.householdService.getHouseholdAvailabilityData('simulator'+this.household?.id.toString(), formattedStartDate, formattedEndDate)
          .subscribe(
            (data: AvailabilityStatus[]) => {
              console.log(data);
              this.availabilityData = data;
              this.processData();
            },
            (error) => {
              console.error('Error fetching availability data:', error);
            }
          );      }
    } else {
      alert('Please select both start and end dates.');
    }
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'")!;  }

  onStartDateChange(event: any) {
    this.startDate = event.value;
  }

  onEndDateChange(event: any) {
    this.endDate = event.value;
  }
}
