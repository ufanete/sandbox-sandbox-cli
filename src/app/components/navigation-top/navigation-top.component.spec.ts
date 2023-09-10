import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationTopComponent } from './navigation-top.component';

describe('NavigationTopComponent', () => {
  let component: NavigationTopComponent;
  let fixture: ComponentFixture<NavigationTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationTopComponent]
    });
    fixture = TestBed.createComponent(NavigationTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
