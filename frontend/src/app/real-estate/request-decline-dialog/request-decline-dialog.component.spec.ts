import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDeclineDialogComponent } from './request-decline-dialog.component';

describe('RequestDeclineDialogComponent', () => {
  let component: RequestDeclineDialogComponent;
  let fixture: ComponentFixture<RequestDeclineDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestDeclineDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDeclineDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
