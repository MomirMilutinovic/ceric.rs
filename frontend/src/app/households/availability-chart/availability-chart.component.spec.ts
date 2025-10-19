import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabilityChartComponent } from './availability-chart.component';

describe('AvailabilityChartComponent', () => {
  let component: AvailabilityChartComponent;
  let fixture: ComponentFixture<AvailabilityChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvailabilityChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvailabilityChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
