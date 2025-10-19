import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcedPasswordChangeComponent } from './forced-password-change.component';

describe('ForcedPasswordChangeComponent', () => {
  let component: ForcedPasswordChangeComponent;
  let fixture: ComponentFixture<ForcedPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForcedPasswordChangeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForcedPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
