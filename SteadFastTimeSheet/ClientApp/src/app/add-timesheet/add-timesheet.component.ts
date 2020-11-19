import { Employee, EmployeeTimeSheet, TimeSheet } from './../models/timeSheet';
import { CommonService } from './../services/common.service';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-timesheet',
  templateUrl: './add-timesheet.component.html',
  styleUrls: ['./add-timesheet.component.css']
})
export class AddTimesheetComponent implements OnInit {
  form: FormGroup;

  constructor(
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddTimesheetComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.form = fb.group({
      'firstName': new FormControl('', Validators.required),
      'lastName': new FormControl('', Validators.required),
      'date': new FormControl('', Validators.required),
      'workHours': new FormControl('', Validators.required),
    });
   }

  ngOnInit() {
  }

  save() {
    if (this.form.invalid) {
      const message = 'Please fill the missing fields.';

      this.snackBar.open(message, '', {
          duration: 2000,
      });

      return;
    }
    const model = {} as EmployeeTimeSheet;
    const employee = {} as Employee;
    const timeSheet = {} as TimeSheet;

    employee.FirstName = this.form.get('firstName').value;
    employee.LastName = this.form.get('lastName').value;
    timeSheet.Date = this.form.get('date').value;
    timeSheet.WorkHours = this.form.get('workHours').value;

    model.employee = employee;
    model.timeSheet = timeSheet;

    this.commonService.addTimeSheet(model).subscribe((result: boolean) => {
      this.dialogRef.close(result);
    },
    (error: any) => {
      console.error(error);
    });
  }

  onCloseClick() {
    this.dialogRef.close(false);
  }
}
