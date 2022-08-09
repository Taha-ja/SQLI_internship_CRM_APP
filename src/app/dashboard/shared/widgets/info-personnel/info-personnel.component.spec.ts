import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPersonnelComponent } from './info-personnel.component';

describe('InfoPersonnelComponent', () => {
  let component: InfoPersonnelComponent;
  let fixture: ComponentFixture<InfoPersonnelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPersonnelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
