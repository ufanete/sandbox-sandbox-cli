import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountFormFieldComponent } from './account-form-field.component';

describe('AccountFormFieldComponent', () => {
  let component: AccountFormFieldComponent;
  let fixture: ComponentFixture<AccountFormFieldComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountFormFieldComponent]
    });
    fixture = TestBed.createComponent(AccountFormFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
