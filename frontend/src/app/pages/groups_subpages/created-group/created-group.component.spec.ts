import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedGroupComponent } from './created-group.component';

describe('CreatedGroupComponent', () => {
  let component: CreatedGroupComponent;
  let fixture: ComponentFixture<CreatedGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatedGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreatedGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
