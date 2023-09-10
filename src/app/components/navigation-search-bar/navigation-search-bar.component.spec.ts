import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSearchBarComponent } from './navigation-search-bar.component';

describe('NavigationSearchBarComponent', () => {
  let component: NavigationSearchBarComponent;
  let fixture: ComponentFixture<NavigationSearchBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationSearchBarComponent]
    });
    fixture = TestBed.createComponent(NavigationSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
