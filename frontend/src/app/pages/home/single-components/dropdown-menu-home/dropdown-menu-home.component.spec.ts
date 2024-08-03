import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownMenuHomeComponent } from './dropdown-menu-home.component';

describe('DropdownMenuHomeComponent', () => {
  let component: DropdownMenuHomeComponent;
  let fixture: ComponentFixture<DropdownMenuHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownMenuHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropdownMenuHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
