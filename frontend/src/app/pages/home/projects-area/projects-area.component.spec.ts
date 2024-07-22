import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsAreaComponent } from './projects-area.component';

describe('ProjectsAreaComponent', () => {
  let component: ProjectsAreaComponent;
  let fixture: ComponentFixture<ProjectsAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsAreaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectsAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
