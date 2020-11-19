using System;
using System.Collections.Generic;

namespace SteadFastTimeSheet.Models
{
    public partial class TimeSheet
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime? Date { get; set; }
        public double? WorkHours { get; set; }
        public DateTime? DateAdded { get; set; }
    }
}
