import { TestBed } from '@angular/core/testing';

import { UiFormService } from './ui-form.service';

describe('UiFormService', () => {
  let service: UiFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
