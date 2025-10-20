import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireResultComponent } from './questionnaire-result.component';

describe('QuestionnaireResultComponent', () => {
  let component: QuestionnaireResultComponent;
  let fixture: ComponentFixture<QuestionnaireResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuestionnaireResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionnaireResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
