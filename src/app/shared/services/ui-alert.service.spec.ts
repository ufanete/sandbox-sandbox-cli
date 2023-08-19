import { TestBed } from '@angular/core/testing';

import { UiAlertService } from './ui-alert.service';

describe('UiAlertService', () => {
  let service: UiAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UiAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
