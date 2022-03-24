import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoctailsListingComponent } from './coctails-listing.component';

describe('CoctailsListingComponent', () => {
  let component: CoctailsListingComponent;
  let fixture: ComponentFixture<CoctailsListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoctailsListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoctailsListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
