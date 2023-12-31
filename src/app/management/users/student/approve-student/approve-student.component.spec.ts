import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveStudentComponent } from './approve-student.component';

describe('ApproveStudentComponent', () => {
  let component: ApproveStudentComponent;
  let fixture: ComponentFixture<ApproveStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveStudentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
