using System.Web.Http;
using Sam.DbContext;

namespace Sam.Api
{
    [System.Web.Http.Authorize, System.Web.Http.RoutePrefix("api/Employees")]
    public class EmployeesController : CRUDController<Employee>
    {
    }
}