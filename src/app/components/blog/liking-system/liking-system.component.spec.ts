import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikingSystemComponent } from './liking-system.component';

describe('LikingSystemComponent', () => {
  let component: LikingSystemComponent;
  let fixture: ComponentFixture<LikingSystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikingSystemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LikingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
