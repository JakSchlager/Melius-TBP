import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOwnGroupComponent } from './create-own-group.component';

describe('CreateOwnGroupComponent', () => {
  let component: CreateOwnGroupComponent;
  let fixture: ComponentFixture<CreateOwnGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateOwnGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateOwnGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
