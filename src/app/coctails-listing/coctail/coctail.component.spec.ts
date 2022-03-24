import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoctailComponent } from './coctail.component';

describe('CoctailComponent', () => {
  let component: CoctailComponent;
  let fixture: ComponentFixture<CoctailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoctailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoctailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
