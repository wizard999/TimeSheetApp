import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTimesheetComponent } from './add-timesheet.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule, MatInputModule, MatSnackBarModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { from } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonService } from '../services/common.service';

describe('AddTimesheetComponent', () => {
  let component: AddTimesheetComponent;
  let fixture: ComponentFixture<AddTimesheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        MatButtonModule,
        MatInputModule,
        MatDialogModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
      ],
      declarations: [ AddTimesheetComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        CommonService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTimesheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create a form with 4 controls', () => {
    expect(component.form.contains('firstName')).toBeTruthy();
    expect(component.form.contains('lastName')).toBeTruthy();
    expect(component.form.contains('date')).toBeTruthy();
    expect(component.form.contains('workHours')).toBeTruthy();
  });

  it('shoud make the first name control required', () => {
    const control = component.form.get('firstName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the last name control required', () => {
    const control = component.form.get('lastName');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the date control required', () => {
    const control = component.form.get('date');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });

  it('shoud make the work hours control required', () => {
    const control = component.form.get('workHours');
    control.setValue('');
    expect(control.valid).toBeFalsy();
  });
});
