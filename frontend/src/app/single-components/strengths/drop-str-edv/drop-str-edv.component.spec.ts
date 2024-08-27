import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropStrEdvComponent } from './drop-str-edv.component';

describe('DropStrEdvComponent', () => {
  let component: DropStrEdvComponent;
  let fixture: ComponentFixture<DropStrEdvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropStrEdvComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DropStrEdvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
