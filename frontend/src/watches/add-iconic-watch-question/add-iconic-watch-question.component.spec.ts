import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIconicWatchQuestionComponent } from './add-iconic-watch-question.component';

describe('AddIconicWatchQuestionComponent', () => {
  let component: AddIconicWatchQuestionComponent;
  let fixture: ComponentFixture<AddIconicWatchQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddIconicWatchQuestionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIconicWatchQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
