import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAvatarComponent } from './dropdown-avatar.component';

describe('DropdownAvatarComponent', () => {
  let component: DropdownAvatarComponent;
  let fixture: ComponentFixture<DropdownAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
