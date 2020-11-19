import { Employee, TimeSheet } from './../models/timeSheet';
import { CommonService } from './../services/common.service';
import { MatDialogModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TimeSheetComponent } from './time-sheet.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { EmployeeTimeSheet } from '../models/timeSheet';
import { from } from 'rxjs';

describe('TimeSheetComponent', () => {
  let component: TimeSheetComponent;
  let fixture: ComponentFixture<TimeSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        MatDialogModule
      ],
      declarations: [ TimeSheetComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [ CommonService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the timesheet list from the service', () => {
    const employee = { Id: 1, FirstName: 'John', LastName: 'Doe' } as Employee;
    const timesheet =  { Id: 1, EmployeeId: 1, Date: new Date(), WorkHours: 8.5, DateAdded: new Date() } as TimeSheet;
    const list = [
      {
        employee: employee,
        timeSheet: timesheet
      }
    ] as EmployeeTimeSheet[];

    const service = TestBed.get(CommonService);
    spyOn(service, 'getEmployeeTimeSheets').and.returnValue(from([ list ]));

    component.ngOnInit();
    component.getEmployeeTimeSheets();
    fixture.detectChanges();

    expect(component.timeSheetList).toBe(list);
  });
});
