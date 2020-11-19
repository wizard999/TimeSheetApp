using SteadFastTimeSheet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SteadFastTimeSheet.Repositories
{
    public class TimeSheetRepository : ITimeSheetRepository
    {
        private readonly steadfast_timesheetContext _steadfast_TimesheetContext;

        public TimeSheetRepository(
            steadfast_timesheetContext steadfast_TimesheetContext
            )
        {
            _steadfast_TimesheetContext = steadfast_TimesheetContext;
        }

        public List<EmployeeTimeSheet> GetEmployeeTimeSheets()
        {
            var query = from e in _steadfast_TimesheetContext.Employee
                        join t in _steadfast_TimesheetContext.TimeSheet on e.Id equals t.EmployeeId
                        select new EmployeeTimeSheet { Employee = e, TimeSheet = t };

            return query.ToList();

        }

        public void InsertEmployee(Employee employee)
        {
            _steadfast_TimesheetContext.Employee.Add(employee);
        }

        public void InsertTimeSheet(TimeSheet timeSheet)
        {
            timeSheet.DateAdded = DateTime.Now;
            _steadfast_TimesheetContext.TimeSheet.Add(timeSheet);
        }

        public void InsertEmployeeTimeSheet(Employee employee, TimeSheet timeSheet)
        {
            InsertEmployee(employee);
            Save();
            timeSheet.EmployeeId = employee.Id;
            InsertTimeSheet(timeSheet);
        }

        public void Save()
        {
            _steadfast_TimesheetContext.SaveChanges();
        }
    }
}
