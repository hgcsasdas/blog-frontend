import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetailsPopupComponent } from './component-details-popup.component';

describe('ComponentDetailsPopupComponent', () => {
  let component: ComponentDetailsPopupComponent;
  let fixture: ComponentFixture<ComponentDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
