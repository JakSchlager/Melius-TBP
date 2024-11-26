import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPasswordInputFieldComponent } from './group-password-input-field.component';

describe('GroupPasswordInputFieldComponent', () => {
  let component: GroupPasswordInputFieldComponent;
  let fixture: ComponentFixture<GroupPasswordInputFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupPasswordInputFieldComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroupPasswordInputFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
