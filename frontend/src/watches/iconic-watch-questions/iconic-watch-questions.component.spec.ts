import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconicWatchQuestionsComponent } from './iconic-watch-questions.component';

describe('IconicWatchQuestionsComponent', () => {
  let component: IconicWatchQuestionsComponent;
  let fixture: ComponentFixture<IconicWatchQuestionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconicWatchQuestionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconicWatchQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
