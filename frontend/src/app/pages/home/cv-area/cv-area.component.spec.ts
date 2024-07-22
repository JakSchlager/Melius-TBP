import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvAreaComponent } from './cv-area.component';

describe('CvAreaComponent', () => {
  let component: CvAreaComponent;
  let fixture: ComponentFixture<CvAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CvAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
