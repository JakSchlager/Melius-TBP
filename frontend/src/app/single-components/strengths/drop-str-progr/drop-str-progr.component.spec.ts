import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropStrProgrComponent } from './drop-str-progr.component';

describe('DropStrProgrComponent', () => {
  let component: DropStrProgrComponent;
  let fixture: ComponentFixture<DropStrProgrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropStrProgrComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropStrProgrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
