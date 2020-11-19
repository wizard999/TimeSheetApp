export interface Employee {
    Id: number;
    FirstName: string;
    LastName: string;
}

export interface TimeSheet {
    Id: number;
    EmployeeId: number;
    Date: Date;
    WorkHours: number;
    DateAdded: Date;
}

export interface EmployeeTimeSheet {
    employee: Employee;
    timeSheet: TimeSheet;
}
