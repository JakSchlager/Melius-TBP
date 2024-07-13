import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthsAreaComponent } from './strengths-area.component';

describe('StrengthsAreaComponent', () => {
  let component: StrengthsAreaComponent;
  let fixture: ComponentFixture<StrengthsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StrengthsAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StrengthsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
