import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdsOverviewComponent } from './households-overview.component';

describe('HouseholdsOverviewComponent', () => {
  let component: HouseholdsOverviewComponent;
  let fixture: ComponentFixture<HouseholdsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HouseholdsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HouseholdsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
