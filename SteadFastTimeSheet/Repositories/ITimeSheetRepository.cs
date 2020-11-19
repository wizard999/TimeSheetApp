using SteadFastTimeSheet.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SteadFastTimeSheet.Repositories
{
    public interface ITimeSheetRepository
    {
        List<EmployeeTimeSheet> GetEmployeeTimeSheets();
        void InsertEmployee(Employee employee);
        void InsertTimeSheet(TimeSheet timeSheet);
        void InsertEmployeeTimeSheet(Employee employee, TimeSheet timeSheet);
        void Save();

    }
}
