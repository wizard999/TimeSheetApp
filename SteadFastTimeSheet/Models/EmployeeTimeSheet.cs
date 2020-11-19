using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SteadFastTimeSheet.Models
{
    public class EmployeeTimeSheet
    {
        public Employee Employee { get; set; }
        public TimeSheet TimeSheet { get; set; }
    }
}
