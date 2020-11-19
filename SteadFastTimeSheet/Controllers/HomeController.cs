using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SteadFastTimeSheet.Models;
using SteadFastTimeSheet.Repositories;

namespace SteadFastTimeSheet.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : ControllerBase
    {
        private readonly ITimeSheetRepository _timeSheetRepository;

        public HomeController(
            ITimeSheetRepository timeSheetRepository
            )
        {
            _timeSheetRepository = timeSheetRepository;
        }

        [HttpGet("GetEmployeeTimeSheets")]
        [ProducesResponseType(typeof(List<EmployeeTimeSheet>), 200)]
        public IActionResult GetEmployeeTimeSheets()
        {
            try
            {
                var results = _timeSheetRepository.GetEmployeeTimeSheets();

                return Ok(results);
            }
            catch (Exception ex)
            {
                return BadRequest();
            }
        }

        [HttpPost("AddTimeSheet")]
        [ProducesResponseType(typeof(bool), 200)]
        [ProducesResponseType(typeof(bool), 400)]
        public IActionResult AddTimeSheet([FromBody] EmployeeTimeSheet employeeTimeSheet)
        {
            try
            {
                _timeSheetRepository.InsertEmployeeTimeSheet(employeeTimeSheet.Employee, employeeTimeSheet.TimeSheet);
                _timeSheetRepository.Save();

                return Ok(true);
            }
            catch (Exception ex)
            {
                return BadRequest(false);
            }
        }

    }
}
