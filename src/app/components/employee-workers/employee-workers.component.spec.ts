import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeWorkersComponent } from './employee-workers.component';

describe('EmployeeWorkersComponent', () => {
  let component: EmployeeWorkersComponent;
  let fixture: ComponentFixture<EmployeeWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeWorkersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
