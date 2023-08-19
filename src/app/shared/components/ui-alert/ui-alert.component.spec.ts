import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiAlertComponent } from './ui-alert.component';

describe('UiAlertComponent', () => {
  let component: UiAlertComponent;
  let fixture: ComponentFixture<UiAlertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UiAlertComponent]
    });
    fixture = TestBed.createComponent(UiAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
