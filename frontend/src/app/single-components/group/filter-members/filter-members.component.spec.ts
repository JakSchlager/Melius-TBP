import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterMembersComponent } from './filter-members.component';

describe('FilterMembersComponent', () => {
  let component: FilterMembersComponent;
  let fixture: ComponentFixture<FilterMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterMembersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilterMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
