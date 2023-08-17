import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAccountFormComponent } from './template-account-form.component';

describe('TemplateAccountFormComponent', () => {
  let component: TemplateAccountFormComponent;
  let fixture: ComponentFixture<TemplateAccountFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateAccountFormComponent]
    });
    fixture = TestBed.createComponent(TemplateAccountFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
