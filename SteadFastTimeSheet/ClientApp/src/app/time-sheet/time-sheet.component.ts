import { EmployeeTimeSheet } from './../models/timeSheet';
import { CommonService } from './../services/common.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { AddTimesheetComponent } from '../add-timesheet/add-timesheet.component';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.css']
})
export class TimeSheetComponent implements OnInit, OnDestroy {
  timeSheetList: EmployeeTimeSheet[] = [];
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private commonService: CommonService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
     this.getEmployeeTimeSheets();
  }

  getEmployeeTimeSheets() {
    this.commonService.getEmployeeTimeSheets().pipe(
      takeUntil(this.ngUnsubscribe)
     )
    .subscribe((results: EmployeeTimeSheet[]) => {
     this.timeSheetList = results;
    },
    (error: any) => {
      console.error(error);
    });
  }

  showAddTimeSheetModel() {
    const dialogRef = this.dialog.open(AddTimesheetComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getEmployeeTimeSheets();
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
